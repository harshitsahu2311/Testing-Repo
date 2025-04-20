import { useQuery } from "@tanstack/react-query";
import {
  fetchActivities,
  ActivityResponse,
} from "@/services/activitiesService";
import { useState, useCallback, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";

export const useActivities = () => {
  // Default date range: startDate = 1 year ago, endDate = today
  const defaultStartDate = dayjs().subtract(1, "year").format("YYYY-MM-DD");
  const defaultEndDate = dayjs().format("YYYY-MM-DD");

  const [searchParams, setSearchParams] = useSearchParams();
  const isInitialMount = useRef(true);

  // Initialize from URL params or defaults
  const [startDate, setStartDate] = useState<string>(
    searchParams.get("startDate") || defaultStartDate
  );
  const [endDate, setEndDate] = useState<string>(
    searchParams.get("endDate") || defaultEndDate
  );

  // Update local state when URL params change, but only if they're different
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const urlStartDate = searchParams.get("startDate");
    const urlEndDate = searchParams.get("endDate");

    if (urlStartDate && urlStartDate !== startDate) {
      setStartDate(urlStartDate);
    }

    if (urlEndDate && urlEndDate !== endDate) {
      setEndDate(urlEndDate);
    }
  }, [searchParams, startDate, endDate]);

  const query = useQuery<ActivityResponse>({
    queryKey: ["activities", startDate, endDate],
    queryFn: () => fetchActivities(startDate, endDate),
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
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

      // Skip update if the dates are the same as current
      if (newStartDate === startDate && newEndDate === endDate) {
        return;
      }

      // Set local state first to avoid extra renders
      setStartDate(newStartDate);
      setEndDate(newEndDate);

      // Update URL with the new date parameters
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set("startDate", newStartDate);
        newParams.set("endDate", newEndDate);
        return newParams;
      });
    },
    [setSearchParams, startDate, endDate]
  );

  return {
    ...query,
    setDateRange,
    currentDateRange: { startDate, endDate },
  };
};
