import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import api from "@/services/httpRequest";

interface ReviewResponse {
  data: any[];
  page: {
    previous: number;
    current: number;
    next: number;
    total: number;
    size: number;
    records: {
      total: number;
      onPage: number;
    };
  };
}

const fetchReviews = async (customerId: string, page: number, size: number) => {
  const { data } = await api.get<ReviewResponse>(
    `/reviews/${customerId}?page=${page}&size=${size}`
  );
  return data;
};

export const useReviews = (customerId: string) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read params from URL or fallback to defaults
  const page = Number(searchParams.get("reviewPage")) || 1;
  const size = Number(searchParams.get("reviewSize")) || 5;

  const query = useQuery({
    queryKey: ["reviews", customerId, page, size],
    queryFn: () => fetchReviews(customerId, page, size),
    refetchOnMount: false,
    enabled: !!customerId, // Only fetch if customerId is available
  });

  // Function to update pagination params
  const updatePagination = (newPage: number, newSize: number) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("reviewPage", newPage.toString());
    updatedParams.set("reviewSize", newSize.toString());
    setSearchParams(updatedParams);
  };

  return {
    ...query,
    page,
    size,
    updatePagination,
  };
};
