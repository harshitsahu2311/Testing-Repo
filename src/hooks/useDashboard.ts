import { useQuery, useQueryClient } from "@tanstack/react-query";
import dashboardService, {
  TransformedDashboardResponse,
} from "@/services/dashboardService";
import { useState, useCallback } from "react";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";

export const useDashboard = () => {
  // Default date range: startDate = 1 year ago, endDate = today
  const defaultStartDate = dayjs().subtract(1, "year").format("YYYY-MM-DD");
  const defaultEndDate = dayjs().format("YYYY-MM-DD");

  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize from URL params or defaults
  const [startDate, setStartDate] = useState<string>(
    searchParams.get("startDate") || defaultStartDate
  );
  const [endDate, setEndDate] = useState<string>(
    searchParams.get("endDate") || defaultEndDate
  );

  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["dashboard", startDate, endDate],
    queryFn: () => dashboardService.fetchDashboardData(startDate, endDate),
  });

  // Function to set both start and end dates
  const setDateRange = useCallback(
    (newStartDate: string, newEndDate: string) => {
      // Validate that start date is not after end date
      const start = dayjs(newStartDate);
      const end = dayjs(newEndDate);

      if (start.isAfter(end)) {
        console.warn("Invalid date range: start date cannot be after end date");
        return;
      }

      // Update URL with the new date parameters
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set("startDate", newStartDate);
        newParams.set("endDate", newEndDate);
        return newParams;
      });

      setStartDate(newStartDate);
      setEndDate(newEndDate);
    },
    [setSearchParams]
  );

  const refreshDashboard = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["dashboard", startDate, endDate],
    });
  }, [queryClient, startDate, endDate]);

  return {
    dashboardData: data as TransformedDashboardResponse | undefined,
    isLoading,
    error,
    refetch,
    setDateRange,
    refreshDashboard,
    currentDateRange: { startDate, endDate },
  };
};
