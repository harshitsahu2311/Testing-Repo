import { useQuery } from "@tanstack/react-query";
import dashboardService from "@/services/dashboardService";
import type { RecentlyJoinedUser } from "@/services/dashboardService";

export interface RecentlyJoinedUsersResponseType {
  message: string;
  data: RecentlyJoinedUser[];
  code: string;
  errors: null | any;
}

export const useRecentlyJoinedUsers = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["recentlyJoinedUsers"],
    queryFn: dashboardService.fetchRecentlyJoinedUsers,
  });

  return {
    recentlyJoinedUsers: data as RecentlyJoinedUsersResponseType | undefined,
    isLoading,
    error,
    refetch,
  };
};
