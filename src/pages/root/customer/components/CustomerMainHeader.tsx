import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  SelectChangeEvent,
  Snackbar,
  Alert,
} from "@mui/material";
import { useCustomer } from "@/hooks/useCustomer";
import { useState, useEffect, useRef } from "react";

type StatusType = "all" | "active" | "inactive";

type CustomerMainHeaderProps = {
  onDeleteClick: () => void;
  onBlockClick: () => void;
  onUnblockClick: () => void;
  status: StatusType;
  search: string;
  selectedRows: string[];
  selectedRowsData: Array<{ id: string; status: string }>;
};

function CustomerMainHeader({
  onDeleteClick,
  onBlockClick,
  onUnblockClick,
  status,
  search,
  selectedRows,
  selectedRowsData,
}: CustomerMainHeaderProps) {
  const { updateSearchParams } = useCustomer();
  const [localSearch, setLocalSearch] = useState(search);
  const initialRender = useRef(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const debounceTimer = setTimeout(() => {
      updateSearchParams({ search: localSearch });
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [localSearch, updateSearchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
  };

  const handleStatusChange = (e: SelectChangeEvent) => {
    const newStatus = e.target.value as StatusType;
    updateSearchParams({
      status: newStatus !== "all" ? newStatus : "",
    });
  };

  const handleDeleteWithCheck = () => {
    if (selectedRows.length === 0) {
      setNotificationMessage("Please select at least one row to delete");
      setShowNotification(true);
      return;
    }
    onDeleteClick();
  };

  const handleBlockWithCheck = () => {
    if (selectedRows.length === 0) {
      setNotificationMessage("Please select at least one row to block");
      setShowNotification(true);
      return;
    }

    // Check if any selected rows are already inactive
    const inactiveRows = selectedRowsData.filter(
      (row) => row.status === "inactive"
    );
    if (inactiveRows.length > 0) {
      setNotificationMessage(
        `${
          inactiveRows.length === selectedRows.length ? "All" : "Some"
        } selected rows are already inactive`
      );
      setShowNotification(true);
      return;
    }

    onBlockClick();
  };

  const handleUnblockWithCheck = () => {
    if (selectedRows.length === 0) {
      setNotificationMessage("Please select at least one row to unblock");
      setShowNotification(true);
      return;
    }

    // Check if any selected rows are already active
    const activeRows = selectedRowsData.filter(
      (row) => row.status === "active"
    );
    if (activeRows.length > 0) {
      setNotificationMessage(
        `${
          activeRows.length === selectedRows.length ? "All" : "Some"
        } selected rows are already active`
      );
      setShowNotification(true);
      return;
    }

    onUnblockClick();
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-4 items-center">
          <FormControl sx={{ minWidth: 120 }}>
            <TextField
              placeholder="By Name, ID"
              label="Search"
              variant="outlined"
              value={localSearch}
              size="small"
              onChange={handleSearchChange}
            />
          </FormControl>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="status-form-label">Status</InputLabel>
            <Select
              labelId="status-form-label"
              id="status-form"
              label="Status"
              value={status}
              size="small"
              onChange={handleStatusChange}
              sx={{
                "& .MuiSelect-select": {
                  paddingRight: "32px",
                  textAlign: "left",
                },
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="flex flex-row items-center gap-4">
          <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteWithCheck}
            size="small"
            sx={{
              borderRadius: "2rem",
              fontSize: "12px",
              paddingX: "1.5rem",
              paddingY: "0.5rem",
            }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={handleBlockWithCheck}
            sx={{
              backgroundColor: "#D32F2F",
              borderRadius: "2rem",
              fontSize: "12px",
              paddingX: "1.5rem",
              paddingY: "0.5rem",
            }}
          >
            Deactivate account
          </Button>
          {selectedRows.length > 0 && (
            <Button
              variant="contained"
              size="small"
              onClick={handleUnblockWithCheck}
              sx={{
                backgroundColor: "#2196F3",
                borderRadius: "2rem",
                fontSize: "12px",
                paddingX: "1.5rem",
                paddingY: "0.5rem",
              }}
            >
              Unblock account
            </Button>
          )}
        </div>
      </div>

      <Snackbar
        open={showNotification}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseNotification} severity="warning">
          {notificationMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomerMainHeader;
