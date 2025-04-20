import { useState } from "react";
import TicketListItem from "./TicketListItem";
import TicketInfoPanel from "./TicketInfoPanel";
import TicketDetailView from "./TicketDetailView";
import {
  FormControl,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { mockTicketInfo } from "./MockData";
import { useTickets, Ticket as TicketType } from "@/hooks/useTickets";
import { format } from "date-fns";
import api from "@/services/httpRequest";
import { TicketStatus, formatTicketStatus } from "@/types/ticket";

const TicketsContainer = () => {
  const [selectedOption, setSelectedOption] = useState("asset-manager");
  const { data, isLoading, error, updateSearchParams, refetch } = useTickets();
  const [search, setSearch] = useState<string>("");
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info",
  });

  // Use the comment hooks
  const { useAddTicketComment } = useTickets();
  const addCommentMutation = useAddTicketComment();

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    // Debounce search - could be implemented with a proper debounce function
    const timeoutId = setTimeout(() => {
      updateSearchParams(undefined, e.target.value);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  // Format date function
  const formatTicketDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy");
    } catch (e) {
      console.log("Error --->", e);
      return "Invalid date";
    }
  };

  // Get currently selected ticket details
  const getSelectedTicketDetails = () => {
    if (!data || !selectedTicket) return null;
    const ticketsArray = Array.isArray(data) ? data : [];
    return ticketsArray.find(
      (ticket: TicketType) => ticket.id === selectedTicket
    );
  };

  // Handle sending a reply
  const handleSendReply = (message: string) => {
    if (!selectedTicket || !message.trim()) return;

    addCommentMutation.mutate(
      { ticketId: selectedTicket, message },
      {
        onSuccess: () => {
          setNotification({
            open: true,
            message: "Comment sent successfully",
            severity: "success",
          });
        },
        onError: () => {
          setNotification({
            open: true,
            message: "Failed to send comment. Please try again.",
            severity: "error",
          });
        },
      }
    );
  };

  // Handle ticket status update
  const handleTicketStatusUpdate = async (newStatus: string) => {
    if (!selectedTicket) return;

    // Get current ticket details
    const ticketDetails = getSelectedTicketDetails();

    // Check if the new status is the same as current status
    if (ticketDetails && ticketDetails.ticket_status === newStatus) {
      // Show notification that no change is needed
      setNotification({
        open: true,
        message: `Ticket is already in ${formatTicketStatus(
          newStatus
        )} status.`,
        severity: "info",
      });
      return; // Exit early - no need to make API call
    }

    try {
      setUpdatingStatus(true);

      // Prepare payload for ticket status update
      const payload = {
        status: newStatus,
        resolutionComment:
          newStatus === TicketStatus.RESOLVED
            ? "Issue has been resolved successfully."
            : newStatus === TicketStatus.CLOSED
            ? "Ticket has been closed."
            : newStatus === TicketStatus.IN_PROGRESS
            ? "Ticket is now in progress."
            : "Ticket status updated.",
      };

      // Send PUT request to update ticket status
      await api.put(`/tickets/${selectedTicket}/status`, payload);

      // Refresh tickets data after status update
      await refetch();

      // Show notification
      setNotification({
        open: true,
        message: `Ticket status has been updated to ${formatTicketStatus(
          newStatus
        )} successfully!`,
        severity: "success",
      });
    } catch (error) {
      console.error(`Error updating ticket status to ${newStatus}:`, error);
      setNotification({
        open: false,
        message: `Failed to update ticket status. Please try again.`,
        severity: "error",
      });
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Handle notification close
  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  const selectedTicketDetails = getSelectedTicketDetails();
  const ticketsArray = Array.isArray(data) ? data : [];

  // Get comments from the selected ticket
  const comments = selectedTicketDetails?.comments || [];

  return (
    <div className="bg-[#F1F1F1] p-2 md:p-3 rounded-md">
      {/* Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,2fr,1.5fr] gap-3">
        {/* Tickets Column */}
        <div className="flex flex-col gap-2 bg-white rounded-lg shadow-sm">
          {/* Tickets Header */}
          <div className="p-3 flex flex-row justify-between items-center">
            <h1 className="font-bold text-sm">Tickets</h1>
            <FormControl sx={{ width: { xs: 100, sm: 150 } }}>
              <TextField
                sx={{
                  backgroundColor: "#F8F8F8",
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { border: "none" },
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "0.75rem",
                    padding: "8px 10px",
                  },
                }}
                className="outline-none"
                placeholder="Search by ID"
                variant="outlined"
                value={search}
                size="small"
                onChange={handleSearchChange}
              />
            </FormControl>
          </div>

          {/* Tickets List */}
          <div className="overflow-y-auto max-h-[600px]">
            {isLoading ? (
              <div className="flex justify-center items-center p-8">
                <CircularProgress size={24} />
              </div>
            ) : error ? (
              <div className="text-red-500 text-center p-4 text-sm">
                Error loading tickets. Please try again.
              </div>
            ) : !ticketsArray.length ? (
              <div className="text-gray-500 text-center p-4 text-sm">
                No tickets found.
              </div>
            ) : (
              ticketsArray.map((ticket: TicketType) => (
                <TicketListItem
                  key={ticket.id}
                  profileImage={ticket.user.avatarUrl || ""}
                  userName={ticket.user.name}
                  date={formatTicketDate(ticket.createdAt)}
                  ticketId={ticket.ticketId || ticket.id.substring(0, 8)}
                  subject={ticket.subject}
                  tags={[
                    {
                      text: formatTicketStatus(ticket.ticket_status),
                      variant:
                        ticket.ticket_status === TicketStatus.OPEN
                          ? "default"
                          : ticket.ticket_status === TicketStatus.RESOLVED
                          ? "primary"
                          : ticket.ticket_status === TicketStatus.CLOSED
                          ? "secondary"
                          : "muted",
                    },
                    {
                      text: ticket.department,
                      variant: "muted",
                    },
                    {
                      text: ticket.location,
                      variant: "primary",
                    },
                  ]}
                  className={`mb-1 ${
                    selectedTicket === ticket.id ? "bg-[#F8F8F8]" : ""
                  }`}
                  onClick={() => setSelectedTicket(ticket.id)}
                />
              ))
            )}
          </div>
        </div>

        {/* Ticket Detail Column */}
        <div className="h-full">
          <TicketDetailView
            title={
              selectedTicketDetails?.subject ||
              "Select a ticket to view details"
            }
            description={selectedTicketDetails?.description || ""}
            statuses={
              selectedTicketDetails
                ? [
                    {
                      label: formatTicketStatus(
                        selectedTicketDetails.ticket_status
                      ),
                      className:
                        selectedTicketDetails.ticket_status ===
                        TicketStatus.OPEN
                          ? "bg-[#FF636342] text-[#D32F2F]"
                          : selectedTicketDetails.ticket_status ===
                            TicketStatus.RESOLVED
                          ? "bg-[#E6F4EA] text-[#0F8815]"
                          : selectedTicketDetails.ticket_status ===
                            TicketStatus.CLOSED
                          ? "bg-[#F0F0F0] text-[#333333]"
                          : "bg-[#FFF3E0] text-[#FF9800]",
                    },
                  ]
                : []
            }
            user={{
              name: selectedTicketDetails?.user?.name || "No user selected",
              avatar: selectedTicketDetails?.user?.avatarUrl || "",
              date: selectedTicketDetails
                ? formatTicketDate(selectedTicketDetails.createdAt)
                : "",
            }}
            message={
              selectedTicketDetails?.subject ||
              "Select a ticket to view details"
            }
            attachments={
              selectedTicketDetails?.attachments?.map((att) => ({
                name: att.fileName,
                size: `${Math.round(att.fileSize / 1024)}kb`,
                url: att.fileUrl,
              })) || []
            }
            replyTo={
              selectedTicketDetails
                ? {
                    role: "Support",
                    removable: false,
                  }
                : undefined
            }
            replyMessage={""}
            onSendReply={handleSendReply}
            comments={comments}
            className="h-full rounded-lg shadow-sm"
          />
        </div>

        {/* Ticket Info Column */}
        <div className="h-full">
          <TicketInfoPanel
            title={selectedTicketDetails?.subject || "Ticket Information"}
            fields={[
              {
                label: "Ticket ID",
                value:
                  selectedTicketDetails?.ticketId ||
                  (selectedTicketDetails?.id
                    ? selectedTicketDetails.id.substring(0, 8)
                    : "N/A"),
              },
              {
                label: "Status",
                value: selectedTicketDetails
                  ? formatTicketStatus(selectedTicketDetails.ticket_status)
                  : "N/A",
              },
              {
                label: "Department",
                value: selectedTicketDetails?.department || "N/A",
              },
              {
                label: "Location",
                value: selectedTicketDetails?.location || "N/A",
              },
              {
                label: "Created At",
                value: selectedTicketDetails
                  ? formatTicketDate(selectedTicketDetails.createdAt)
                  : "N/A",
              },
            ]}
            avatarText={selectedTicketDetails?.user?.name?.[0] || "T"}
            dropdownOptions={mockTicketInfo.dropdownOptions}
            selectedOption={selectedOption}
            onOptionChange={setSelectedOption}
            currentStatus={selectedTicketDetails?.ticket_status}
            onStatusUpdate={handleTicketStatusUpdate}
            isUpdatingStatus={updatingStatus}
            className="h-full rounded-lg shadow-sm"
          />
        </div>
      </div>

      {/* Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleNotificationClose}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TicketsContainer;
