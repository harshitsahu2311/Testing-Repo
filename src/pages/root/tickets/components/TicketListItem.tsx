
import { Avatar } from "@mui/material";

export interface TicketListItemProps {
  profileImage: string;
  userName: string;
  date: string;
  ticketId: string;
  subject: string;
  tags: Array<{
    text: string;
    variant?: "default" | "muted" | "primary" | "secondary";
    className?: string;
  }>;
  className?: string;
  onClick?: () => void;
}

const TicketListItem = ({
  profileImage,
  userName,
  date,
  ticketId,
  subject,
  tags,
  className,
  onClick,
}: TicketListItemProps) => {
  return (
    <div
      className={`w-full border-t border-t-[#F1F1F1] bg-white p-3 transition-all duration-300 hover:bg-[#F8F8F8] cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* Header with user info and date */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Avatar sx={{ width: "32px", height: "32px" }}>
            {profileImage ? (
              <img
                src={profileImage}
                alt={userName}
                className="rounded-full object-cover"
              />
            ) : (
              userName.charAt(0)
            )}
          </Avatar>
          <div>
            <h3 className="font-medium text-xs text-gray-900">{userName}</h3>
            <p className="text-[10px] text-gray-500">Ticket ID - {ticketId}</p>
          </div>
        </div>
        <span className="text-[10px] text-gray-500">{date}</span>
      </div>

      {/* Ticket description */}
      <p className="mb-3 text-xs text-gray-800">{subject}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag, index) => (
          <TagBadge
            key={index}
            text={tag.text}
            variant={tag.variant}
            className={tag.className}
          />
        ))}
      </div>
    </div>
  );
};

// Tag badge component
interface TagBadgeProps {
  text: string;
  variant?: "default" | "muted" | "primary" | "secondary";
  className?: string;
}

const TagBadge = ({ text, variant = "default", className }: TagBadgeProps) => {
  const baseClasses =
    "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium";

  // Custom status colors overriding variant classes
  let statusClass = "";
  if (text === "Resolved") {
    statusClass = "bg-[#E6F4EA] text-[#0F8815]"; // Lighter green background with dark green text
  } else if (text === "In Progress") {
    statusClass = "bg-[#FFF3E0] text-[#FF9800]"; // Orange background with orange text
  } else if (text === "Open") {
    statusClass = "bg-[#FF636342] text-[#D32F2F]"; // Red for open tickets
  } else if (text === "Closed") {
    statusClass = "bg-[#F0F0F0] text-[#333333]"; // Grey background with dark grey text
  }

  const variantClasses = {
    default: statusClass || "bg-[#FF636342] text-[#D32F2F]",
    muted: statusClass || "bg-[#D11AFF0A] text-[#D11AFF]",
    primary: statusClass || "bg-[#007DA742] text-[#007DA7]",
    secondary: statusClass || "",
  };

  const finalClasses = `${baseClasses} ${className || variantClasses[variant]}`;

  return <span className={finalClasses}>{text}</span>;
};

export default TicketListItem;
