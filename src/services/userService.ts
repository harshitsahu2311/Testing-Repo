
import api from "./httpRequest";

/**
 * Block users by IDs
 */
export const blockUser = async (userIds: string[]) => {
  return await api.post(`/users/block`, { 
    userIds: userIds,
    blockedReason: "Violation of terms of service" 
  });
};
