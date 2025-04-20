import {
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { TicketStatus, formatTicketStatus } from "@/types/ticket";

export type InfoField = {
  label: string;
  value: string;
  action?: {
    text: string;
    onClick: () => void;
  };
};

export interface TicketInfoPanelProps {
  title: string;
  fields: InfoField[];
  avatarText?: string;
  avatarImage?: string;
  dropdownOptions?: {
    label: string;
    value: string;
  }[];
  selectedOption?: string;
  onOptionChange?: (value: string) => void;
  actionButton?: {
    text: string;
    onClick: () => void;
  };
  className?: string;
  currentStatus?: string;
  onStatusUpdate?: (status: string) => void;
  isUpdatingStatus?: boolean;
}

const TicketInfoPanel: React.FC<TicketInfoPanelProps> = ({
  title,
  fields,
  avatarText,
  avatarImage,
  dropdownOptions,
  selectedOption,
  onOptionChange,
  actionButton,
  className,
  currentStatus,
  onStatusUpdate,
  isUpdatingStatus = false,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>(
    currentStatus || TicketStatus.OPEN
  );

  // Update selectedStatus when currentStatus changes
  useEffect(() => {
    if (currentStatus) {
      setSelectedStatus(currentStatus);
    }
  }, [currentStatus]);

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setSelectedStatus(event.target.value);
  };

  const handleConfirmStatusChange = () => {
    if (onStatusUpdate) {
      onStatusUpdate(selectedStatus);
    }
  };

  const statusOptions = Object.values(TicketStatus).map((status) => ({
    value: status,
    label: formatTicketStatus(status),
  }));

  // Check if the selected status is the same as the current status
  const isCurrentStatus = selectedStatus === currentStatus;

  return (
    <div
      className={`bg-white rounded-xl shadow-sm overflow-hidden h-full flex flex-col ${
        className || ""
      }`}
    >
      <div className="p-4 space-y-4 flex-1">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>

        <div className="flex items-center justify-between bg-[#F8F8F8] p-2 rounded-lg">
          {(avatarText || avatarImage) && (
            <div className="flex w-full items-center space-x-2">
              <div className="flex-shrink-0 h-7 w-7 bg-[#E2EBF2] text-[#007DA7] rounded-md flex items-center justify-center">
                {avatarImage ? (
                  <img
                    src={avatarImage}
                    alt="Avatar"
                    className="h-full w-full object-cover rounded-md"
                  />
                ) : (
                  <span className="text-xs font-medium">{avatarText}</span>
                )}
              </div>

              {dropdownOptions && (
                <select
                  value={selectedOption}
                  onChange={(e) => onOptionChange?.(e.target.value)}
                  className="w-full bg-[#F8F8F8] text-xs border-0 focus:ring-0 p-0 pr-7 text-gray-700 outline-none"
                >
                  {dropdownOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}
        </div>

        <div className="space-y-3 flex-1">
          {fields.map((field, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b border-gray-100 pb-1.5"
            >
              <p className="text-xs text-gray-500">{field.label}</p>
              <div className="flex items-center">
                {field.label === "Status" ? (
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      field.value === "Open"
                        ? "bg-[#FF636342] text-[#D32F2F]"
                        : field.value === "In Progress"
                        ? "bg-[#FFF3E0] text-[#FF9800]"
                        : field.value === "Resolved"
                        ? "bg-[#E6F4EA] text-[#0F8815]"
                        : field.value === "Closed"
                        ? "bg-[#F0F0F0] text-[#333333]"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {field.value}
                  </span>
                ) : (
                  <p className="text-xs font-medium text-gray-900">
                    {field.value}
                  </p>
                )}
                {field.action && (
                  <Button
                    sx={{
                      textTransform: "none",
                      minWidth: "auto",
                      ml: 1,
                      p: 0,
                    }}
                    onClick={field.action.onClick}
                    className="text-xs text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    {field.action.text === "view map" ? (
                      <span className="text-[#007DA7] underline text-[10px]">
                        {field.action.text}
                      </span>
                    ) : (
                      field.action.text
                    )}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {onStatusUpdate && (
          <div className="space-y-3 pt-2">
            <FormControl fullWidth size="small">
              <Select
                value={selectedStatus}
                onChange={handleStatusChange}
                sx={{
                  fontSize: "12px",
                  backgroundColor: "#F8F8F8",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E0E0E0",
                  },
                }}
              >
                {statusOptions.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    sx={{ fontSize: "12px" }}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              onClick={handleConfirmStatusChange}
              disabled={isUpdatingStatus || isCurrentStatus || !currentStatus}
              className={`w-full font-medium py-1.5 rounded-lg transition-colors focus:outline-none ${
                isCurrentStatus || !currentStatus
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              sx={{
                backgroundColor:
                  isCurrentStatus || !currentStatus ? "#9E9E9E" : "#2196F3",
                color: "white",
                textTransform: "none",
                fontSize: "12px",
                "&:hover": {
                  backgroundColor:
                    isCurrentStatus || !currentStatus ? "#9E9E9E" : "#1976D2",
                },
              }}
            >
              {isUpdatingStatus
                ? "Processing..."
                : isCurrentStatus
                ? "Already Applied"
                : !currentStatus
                ? "Select a ticket first"
                : "Confirm"}
            </Button>
          </div>
        )}

        {actionButton && !onStatusUpdate && (
          <div className="pt-2">
            <Button
              variant="contained"
              onClick={actionButton.onClick}
              className="w-full font-medium py-1.5 rounded-lg transition-colors focus:outline-none"
              sx={{
                backgroundColor: "#2196F3",
                color: "white",
                textTransform: "none",
                fontSize: "12px",
              }}
            >
              {actionButton.text}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketInfoPanel;
