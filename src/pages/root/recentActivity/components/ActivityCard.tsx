import React from "react";
import {
  People as Users,
  Settings,
  CreditCard,
  AttachMoney as DollarSign,
} from "@mui/icons-material";
// import { Link } from "react-router-dom";

type ActivityType = "employees" | "profile" | "transactions";

interface ActivityCardProps {
  type: ActivityType;
  title: string;
  description: string;
  customerId: string;
  actionLink: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  type,
  title,
  description,
  customerId,
  // actionLink,
}) => {
  const getIcon = () => {
    switch (type) {
      case "employees":
        return <Users className="h-4 w-4 text-white" />;
      case "profile":
        return <CreditCard className="h-4 w-4 text-white" />;
      case "transactions":
        return <DollarSign className="h-4 w-4 text-white" />;
      default:
        return <Settings className="h-4 w-4 text-white" />;
    }
  };

  return (
    <div className="flex items-center p-3 bg-white rounded-lg w-[calc(100%-10rem)] h-16 shadow-sm border border-[#007DA7]">
      <div className="flex items-center justify-center mr-2">
        <div className="bg-[#0088a9] p-2 rounded-lg flex items-center justify-center">
          {getIcon()}
        </div>
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-sm text-gray-800 mb-0.5">
          {title}{" "}
          {customerId && (
            <span className="text-gray-500 text-xs ml-1">({customerId})</span>
          )}
        </h3>
        <p className="text-gray-600 text-xs">
          {description}
          {/* {actionLink && (
            <span className="text-blue-primary underline ml-3">
              <Link to={actionLink}>More details</Link>
            </span>
          )} */}
        </p>
      </div>
    </div>
  );
};

export default ActivityCard;
