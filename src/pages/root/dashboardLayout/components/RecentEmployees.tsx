import { useNavigate } from "react-router-dom";
import { useRecentlyJoinedUsers } from "@/hooks/useRecentlyJoinedUsers";
import { useState } from "react";

// Define user interface with optional id
interface User {
  name: string;
  joinedAt: string;
  avatarUrl: string;
  id?: string;
}

const RecentEmployees = () => {
  const { recentlyJoinedUsers, isLoading } = useRecentlyJoinedUsers();
  const navigate = useNavigate();

  // Colors for avatars
  const colorPairs = [
    { bg: "bg-[#E2EBF2]", text: "text-[#4482B3]" },
    { bg: "bg-[#F6DDF5]", text: "text-[#CC58C7]" },
    { bg: "bg-[#F8EAE6]", text: "text-[#DF6846]" },
    { bg: "bg-[#BDEFFF]", text: "text-[#2F839E]" },
    { bg: "bg-[#E2EBF2]", text: "text-[#4482B3]" },
    { bg: "bg-[#F6DDF5]", text: "text-[#CC58C7]" },
  ];

  // Toggle between collapsed and full list
  const [showAll, setShowAll] = useState(false);

  // Fallback data
  const defaultData: User[] = [
    {
      name: "Loading...",
      joinedAt: "",
      avatarUrl: "",
    },
  ];

  const userData: User[] = recentlyJoinedUsers?.data || defaultData;
  const hasMoreUsers = userData.length > 6;

  // Determine users to show
  const displayedUsers = showAll ? userData : userData.slice(0, 6);

  const handleUserClick = (userId?: string) => {
    if (userId) {
      // You can handle routing here if needed
      navigate(`/taxi-details/${userId}`);
    }
  };

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-[14px] font-bold">Recently Joined Customers</h3>
        {hasMoreUsers && !isLoading && (
          <p
            className="underline underline-offset-2 text-[12px] cursor-pointer text-[#020126] opacity-60 hover:opacity-100"
            onClick={toggleShowAll}
          >
            {showAll ? "Show Less" : "View All"}
          </p>
        )}
      </div>

      {/* Employee List */}
      {isLoading ? (
        <div className="py-4 text-[#b6b6b6] text-[12px]">
          Loading recent users...
        </div>
      ) : (
        displayedUsers.map((user, index) => (
          <div
            key={index}
            className="flex items-start gap-2 py-2 cursor-pointer"
            onClick={() => handleUserClick(user.id)}
          >
            {/* Avatar */}
            <div
              className={`w-7 h-7 flex items-center justify-center rounded-md font-bold ${
                colorPairs[index % colorPairs.length].bg
              }`}
            >
              <h1
                className={`text-[12px] ${
                  colorPairs[index % colorPairs.length].text
                }`}
              >
                {user.name && user.name !== "null null"
                  ? user.name.charAt(0).toUpperCase()
                  : "U"}
              </h1>
            </div>

            {/* Employee Details */}
            <div className="flex-1">
              <h2 className="text-[#020126] font-normal text-[12px] leading-tight truncate max-w-[180px]">
                {user.name === "null null" ? "Unknown User" : user.name}
              </h2>
              <p className="text-[#b6b6b6] font-medium text-[11px] truncate max-w-[180px]">
                {user.joinedAt}
              </p>
            </div>
          </div>
        ))
      )}

      {!isLoading && userData.length === 0 && (
        <div className="py-4 text-[#b6b6b6] text-[12px]">
          No recent users found
        </div>
      )}
    </div>
  );
};

export default RecentEmployees;
