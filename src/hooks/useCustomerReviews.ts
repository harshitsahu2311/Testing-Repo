import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useLocation } from "react-router-dom";
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
  message: string;
  code: string;
  errors: null | any;
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

const fetchCustomerReviews = async (
  customerId: string,
  page: number,
  size: number,
  userType: "rental" | "taxi" = "rental"
) => {
  const params: Record<string, any> = { page, size };

  const url = `/reviews/${userType}/${customerId}`;
  const queryString = new URLSearchParams(params).toString();

  console.log(url, queryString);

  const data = await api.get<ReviewResponse>(`${url}?${queryString}`);

  console.log(data);
  return data;
};

export const useCustomerReviews = (customerId: string) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  // Determine user type based on URL path
  const userType = location.pathname.includes("/taxi-details/")
    ? "taxi"
    : "rental";

  // Read params from URL or fallback to defaults
  const page = Number(searchParams.get("reviewPage")) || 1;
  const size = Number(searchParams.get("reviewSize")) || 5;

  const query = useQuery({
    queryKey: ["customerReviews", customerId, page, size, userType],
    queryFn: () => fetchCustomerReviews(customerId, page, size, userType),
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
    userType,
  };
};
