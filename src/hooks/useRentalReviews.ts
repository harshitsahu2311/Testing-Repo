import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import api from "@/services/httpRequest";

interface ReviewResponse {
  data: Array<{
    id: string;
    userId: string;
    rideId: string;
    vehicle_number: string;
    review_description: string;
    reviewby: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
  }>;
  page: {
    current: string;
    next: string | null;
    previous: string | null;
    total: number;
    size: string;
    records: {
      total: number;
      onPage: number;
    };
  };
}

const fetchRentalReviews = async (
  rentalId: string,
  page: number,
  size: number
) => {
  const { data } = await api.get<ReviewResponse>(
    `/reviews/rental/${rentalId}?page=${page}&size=${size}`
  );
  return data;
};

export const useRentalReviews = (rentalId: string) => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  const query = useQuery({
    queryKey: ["rentalReviews", rentalId, page, size],
    queryFn: () => fetchRentalReviews(rentalId, page, size),
    enabled: !!rentalId, // Only fetch if rentalId is available
  });

  // Function to update pagination params
  const updatePagination = (newPage: number, newSize: number) => {
    setPage(newPage);
    setSize(newSize);
  };

  return {
    ...query,
    page,
    size,
    updatePagination,
  };
};
