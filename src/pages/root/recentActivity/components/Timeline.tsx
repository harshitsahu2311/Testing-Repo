import React from "react";
import ActivityCard from "./ActivityCard";
import AdjustIcon from "@mui/icons-material/Adjust";

type ActivityType = "employees" | "profile" | "transactions";

interface TimelineItemProps {
  time: string;
  type: ActivityType;
  title: string;
  description: string;
  index: number;
  lastIndex: number;
  customerId?: string;
  actionLink?: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  time,
  type,
  title,
  description,
  index,
  lastIndex,
  customerId,
  actionLink,
}) => {
  return (
    <div className="flex gap-2 sm:gap-4 mb-3">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center z-10 bg-white">
          <AdjustIcon
            style={{
              color: "#007DA7",
              fontSize: "25px",
            }}
          />
        </div>
        {/* Vertical line */}
        {index !== lastIndex && (
          <div className="w-0.5 bg-[#00000033] h-full"></div>
        )}
      </div>

      <div className="text-gray-500 mb-1 font-medium text-xs whitespace-nowrap min-w-[3.5rem] sm:min-w-[6.5rem] text-ellipsis overflow-hidden">
        {time}
      </div>

      <div className="flex-1 pr-2">
        <ActivityCard
          type={type}
          title={title}
          description={description}
          customerId={customerId || ""}
          actionLink={actionLink || ""}
        />
      </div>
    </div>
  );
};

export default TimelineItem;
