import React, { useState } from "react";
import { useActivities } from "@/hooks/useActivities";
import TimelineItem from "./Timeline";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";

dayjs.extend(relativeTime);

const ActivityTimeline: React.FC = () => {
  const { data } = useActivities();
  // State to track which sections are collapsed
  const [collapsedSections, setCollapsedSections] = useState<
    Record<string, boolean>
  >({});

  const toggleSection = (sectionIndex: number) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionIndex]: !prev[sectionIndex],
    }));
  };

  if (!data?.data || data.data.length === 0) {
    return <div className="text-center p-4">No activities found</div>;
  }

  // Function to determine the activity type based on title
  const getActivityType = (
    title: string
  ): "employees" | "profile" | "transactions" => {
    if (title.includes("user")) return "employees";
    if (title.includes("ticket")) return "profile";
    return "transactions";
  };

  return (
    <div className="mt-2">
      {data.data.map((group, groupIndex) => (
        <div key={`group-${groupIndex}`} className="mb-6">
          <div
            className="flex items-center gap-2 mb-3 cursor-pointer"
            onClick={() => toggleSection(groupIndex)}
          >
            {collapsedSections[groupIndex] ? (
              <KeyboardArrowRight className="w-4 h-4 text-gray-700" />
            ) : (
              <KeyboardArrowDown className="w-4 h-4 text-gray-700" />
            )}
            <h3 className="text-md font-semibold text-gray-700">
              {group.date}
            </h3>
          </div>

          {!collapsedSections[groupIndex] && (
            <div className="pl-2">
              {group.activities.map((activity, activityIndex) => (
                <TimelineItem
                  key={`activity-${groupIndex}-${activityIndex}`}
                  time={activity.time}
                  type={getActivityType(activity.title)}
                  title={activity.title}
                  description={activity.description}
                  index={activityIndex}
                  lastIndex={group.activities.length - 1}
                  customerId={activity.details?.customerId}
                  actionLink={activity.details?.actionLink}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ActivityTimeline;
