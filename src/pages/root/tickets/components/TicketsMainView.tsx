import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Greetings from "@/components/greeting";
import { useState, useEffect } from "react";
import { FilterAlt } from "@mui/icons-material";
import TicketsContainer from "./TicketsContainer";
import { useTickets } from "@/hooks/useTickets";
import CreateTicketModal from "./CreateTicketModal";

type StatusType = "All" | "Open" | "Resolved" | "In Progress" | "Closed";

// Map UI status values to API status values
const statusToApiValue: Record<StatusType, string | undefined> = {
  All: undefined,
  Open: "open",
  Resolved: "resolved",
  "In Progress": "in_progress",
  Closed: "closed",
};

// Map API status values to UI status values
const apiValueToStatus = (apiValue: string | undefined): StatusType => {
  if (!apiValue) return "All";

  switch (apiValue.toLowerCase()) {
    case "open":
      return "Open";
    case "resolved":
      return "Resolved";
    case "in_progress":
      return "In Progress";
    case "closed":
      return "Closed";
    default:
      return "All";
  }
};

function TicketsMainView() {
  const {
    updateSearchParams,
    status: urlStatus,
    search: urlSearch,
    refetch,
  } = useTickets();
  const [status, setStatus] = useState<StatusType>("All");
  const [search, setSearch] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Sync component state with URL params on mount and when URL params change
  useEffect(() => {
    if (urlStatus) {
      setStatus(apiValueToStatus(urlStatus));
    } else {
      setStatus("All");
    }

    if (urlSearch) {
      setSearch(urlSearch);
    } else {
      setSearch("");
    }
  }, [urlStatus, urlSearch]);

  // Handle status change
  const handleStatusChange = (newStatus: StatusType) => {
    setStatus(newStatus);
    updateSearchParams(statusToApiValue[newStatus], search || undefined);
  };

  // Handle search change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    updateSearchParams(statusToApiValue[status], newSearch || undefined);
  };

  // Apply search filter on button click or Enter key
  const applySearch = () => {
    updateSearchParams(statusToApiValue[status], search || undefined);
  };

  // Handle Enter key press in search field
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      applySearch();
    }
  };

  // Open create ticket modal
  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  // Close create ticket modal
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  // Handle successful ticket creation
  const handleTicketCreated = () => {
    // Refresh the ticket list
    refetch();
  };

  return (
    <div className="flex flex-col gap-4 p-3 md:p-4">
      {/* Header with greeting and user icon */}
      <div className="flex justify-between items-center pb-1">
        <div>
          <Greetings />
        </div>
        <div>
          <div className="h-8 w-8 rounded-md font-medium text-AccentBlue flex justify-center items-center bg-SoftBlue text-sm">
            N
          </div>
        </div>
      </div>

      {/* Search and filter controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Search field */}
          <FormControl sx={{ minWidth: { xs: "100%", sm: 180 } }}>
            <TextField
              placeholder="By Name, ID"
              label="Search"
              variant="outlined"
              value={search}
              size="small"
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              fullWidth
              inputProps={{ style: { fontSize: "0.875rem" } }}
              InputLabelProps={{ style: { fontSize: "0.875rem" } }}
            />
          </FormControl>

          {/* Status dropdown */}
          <FormControl sx={{ minWidth: { xs: "100%", sm: 110 } }}>
            <InputLabel id="status-form-label" style={{ fontSize: "0.875rem" }}>
              Status
            </InputLabel>
            <Select
              labelId="status-form-label"
              id="status-form"
              label="Status"
              value={status}
              size="small"
              onChange={(event) =>
                handleStatusChange(event.target.value as StatusType)
              }
              sx={{ fontSize: "0.875rem" }}
            >
              <MenuItem value={"All"} sx={{ fontSize: "0.875rem" }}>
                All
              </MenuItem>
              <MenuItem value={"Open"} sx={{ fontSize: "0.875rem" }}>
                Open
              </MenuItem>
              <MenuItem value={"In Progress"} sx={{ fontSize: "0.875rem" }}>
                In Progress
              </MenuItem>
              <MenuItem value={"Resolved"} sx={{ fontSize: "0.875rem" }}>
                Resolved
              </MenuItem>
              <MenuItem value={"Closed"} sx={{ fontSize: "0.875rem" }}>
                Closed
              </MenuItem>
            </Select>
          </FormControl>

          {/* Filter button */}
          <IconButton className="ml-0" size="small" onClick={applySearch}>
            <FilterAlt fontSize="small" />
          </IconButton>
        </div>

        {/* Create ticket button */}
        <div className="w-full md:w-auto mt-2 md:mt-0">
          <Button
            variant="contained"
            size="small"
            onClick={openCreateModal}
            sx={{
              backgroundColor: "#2196F3",
              borderRadius: "24px",
              width: { xs: "100%", md: "160px" },
              fontSize: "13px",
              textTransform: "none",
              py: "6px",
            }}
          >
            Create Ticket
          </Button>
        </div>
      </div>

      {/* Ticket Container */}
      <div>
        <TicketsContainer />
      </div>

      {/* Create Ticket Modal */}
      <CreateTicketModal
        open={isCreateModalOpen}
        onClose={closeCreateModal}
        onSuccess={handleTicketCreated}
      />
    </div>
  );
}

export default TicketsMainView;
