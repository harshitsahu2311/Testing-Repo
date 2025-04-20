import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BillingIcon from "@/assets/svg/BillingIcon";
import EmployeeIcon from "@/assets/svg/EmployeeIcon";
import { Tooltip } from "@mui/material";
import { useActivities } from "@/hooks/useActivities";

interface Activity {
  type: string;
  time: string;
  info: string;
  details?: any;
  title?: string;
}

interface ActivityGroup {
  activities: Array<{
    type: string;
    time: string;
    description: string;
    details?: any;
    title?: string;
    eventType?: string;
  }>;
}

interface ActivitiesProps {
  activities?: Activity[] | ActivityGroup[];
  isLoading?: boolean;
}

const Activities = ({ activities, isLoading }: ActivitiesProps) => {
  const [showAll] = useState(false);
  const navigate = useNavigate();
  const activitiesHook = useActivities();

  const loadingState =
    isLoading !== undefined ? isLoading : activitiesHook.isLoading;
  const activitiesData = activities || activitiesHook.data?.data || [];

  if (loadingState) {
    return <div className="p-2">Loading activities...</div>;
  }

  if (activitiesHook.isError && !activities) {
    return <div className="p-2 text-red-500">Error loading activities</div>;
  }

  // Process the activities data
  let allActivities: Activity[] = [];

  if (Array.isArray(activitiesData)) {
    // Check if it's an array of Activity or ActivityGroup
    if (activitiesData.length > 0 && "activities" in activitiesData[0]) {
      // It's ActivityGroup[]
      const groupData = activitiesData as ActivityGroup[];
      allActivities = groupData.flatMap((group) =>
        group.activities.map((activity) => ({
          type: activity.type || getActivityType(activity.eventType || ""),
          time: activity.time,
          info: activity.description,
          details: activity.details,
          title: activity.title,
        }))
      );
    } else {
      // It's Activity[] or already processed data
      allActivities = activitiesData as Activity[];
    }
  }

  const displayedData = showAll ? allActivities : allActivities.slice(0, 6);
  const hasMoreItems = allActivities.length > 6;

  const handleActivityClick = (details: any) => {
    if (details?.actionLink) {
      console.log("Navigating to:", details.actionLink);
      navigate(details.actionLink);
    } else {
      console.log("No action link found, navigating to recent-activity");
      navigate("/recent-activity");
    }
  };

  const handleViewAllClick = () => {
    navigate("/recent-activity");
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-[14px] font-bold">Activities</h3>
        {hasMoreItems && (
          <p
            className="underline underline-offset-2 text-[12px] cursor-pointer text-[#020126] opacity-60 hover:opacity-100"
            onClick={handleViewAllClick}
          >
            {showAll ? "Show Less" : "View All"}
          </p>
        )}
      </div>

      {displayedData.map((activity, index) => (
        <div
          key={index}
          className="flex items-start gap-2 py-2 cursor-pointer hover:bg-gray-50 rounded-md transition-colors"
          onClick={() => handleActivityClick(activity.details)}
        >
          <div className="w-7 h-7 flex items-center justify-center">
            {activity.type.includes("billing") ? (
              <BillingIcon />
            ) : (
              <EmployeeIcon />
            )}
          </div>

          <div className="flex-1">
            <Tooltip title={activity.info} arrow>
              <h2 className="text-[#020126] font-normal text-[12px] leading-tight truncate max-w-[180px]">
                {activity.info}
              </h2>
            </Tooltip>

            <div className="flex items-center gap-1 text-[11px]">
              <span className="text-[#777777] capitalize font-bold">
                {activity.type}
              </span>
              <span className="text-[#777777]">•</span>
              <p className="text-[#b6b6b6] font-medium">{activity.time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const getActivityType = (eventType: string): string => {
  switch (eventType) {
    case "ticket_created":
      return "support";
    case "customer_blocked":
      return "bike taxi customer";
    case "customer_disabled":
      return "rental customer";
    default:
      return "support";
  }
};

export default Activities;
