import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import FloModal from "@/components/modals/FloModal";
import api from "@/services/httpRequest";

interface CreateTicketModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void; // Callback to refresh ticket list
}

interface TicketFormData {
  subject: string;
  description: string;
  priority: "low" | "medium" | "high";
  location: string;
  map_url: string | null;
}

const CreateTicketModal: React.FC<CreateTicketModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TicketFormData>({
    defaultValues: {
      subject: "",
      description: "",
      priority: "low",
      location: "Remote",
      map_url: null,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const onSubmit = async (data: TicketFormData) => {
    try {
      setIsSubmitting(true);

      // Prepare payload according to the required format
      const payload = {
        subject: data.subject,
        description: data.description,
        priority: data.priority,
        location: data.location,
        map_url: data.map_url,
      };

      // Send POST request to create ticket
      const response = await api.post("/tickets", payload);

      // Check response and handle success
      if (response.status === 200 || response.status === 201) {
        console.log("Ticket created successfully:", response.data);

        // Reset form
        reset();

        // Close modal
        onClose();

        // Call success callback if provided (to refresh ticket list)
        if (onSuccess) {
          onSuccess();
        }

        // Show success notification instead of alert
        setNotification({
          open: true,
          message: "Ticket created successfully!",
          severity: "success",
        });
      }
    } catch (error) {
      console.error("Error creating ticket:", error);

      // Show error notification instead of alert
      setNotification({
        open: true,
        message: "Failed to create ticket. Please try again.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <>
      <FloModal open={open} onClose={onClose} sx={{ width: "50vw" }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Create New Ticket
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Subject"
                {...register("subject", { required: "Subject is required" })}
                error={!!errors.subject}
                helperText={errors.subject?.message}
                size="small"
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                {...register("description", {
                  required: "Description is required",
                })}
                error={!!errors.description}
                helperText={errors.description?.message}
                sx={{ mb: 2 }}
              />

              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                    <InputLabel id="priority-label">Priority</InputLabel>
                    <Select
                      labelId="priority-label"
                      label="Priority"
                      {...field}
                    >
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />

              <TextField
                fullWidth
                label="Location"
                {...register("location", { required: "Location is required" })}
                error={!!errors.location}
                helperText={errors.location?.message}
                size="small"
                sx={{ mb: 2 }}
                defaultValue="Remote"
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button
                variant="outlined"
                onClick={() => {
                  reset();
                  onClose();
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  backgroundColor: "#2196F3",
                  "&:hover": { backgroundColor: "#1976D2" },
                }}
              >
                {isSubmitting ? "Creating..." : "Create Ticket"}
              </Button>
            </Box>
          </form>
        </Box>
      </FloModal>

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
    </>
  );
};

export default CreateTicketModal;
