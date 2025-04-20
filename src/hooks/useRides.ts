import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useLocation } from "react-router-dom";
import api from "@/services/httpRequest";

interface RideResponse {
  data: Array<{
    id: string;
    ride_id: string;
    vehicle_number: string;
    booking_date: string | null;
    booking_time: string | null;
    fare: string | null;
    ride_status: string;
  }>;
  message: string;
  code: string;
  errors: null | any;
  page: {
    previous: number | null;
    current: string;
    next: string | null;
    total: number;
    size: string;
    records: {
      total: number;
      onPage: number;
    };
  };
}

const fetchRides = async (
  customerId: string,
  page: number,
  size: number,
  status?: string,
  userType: "rental" | "taxi" = "rental"
) => {
  const params: Record<string, any> = { page, size };
  if (status) params.status = status;

  const url = `/rides/${userType}/${customerId}`;
  const queryString = new URLSearchParams(params).toString();

  const data = await api.get<RideResponse>(`${url}?${queryString}`);
  return data;
};

export const useRides = (customerId: string) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  // Determine user type based on URL path
  const userType = location.pathname.includes("/taxi-details/")
    ? "taxi"
    : "rental";

  // Read params from URL or fallback to defaults
  const page = Number(searchParams.get("page")) || 1;
  const size = Number(searchParams.get("size")) || 10;
  const status = searchParams.get("status") || undefined;

  const query = useQuery({
    queryKey: ["rides", customerId, page, size, status, userType],
    queryFn: () => fetchRides(customerId, page, size, status, userType),
    refetchOnMount: false,
    enabled: !!customerId, // Only fetch if customerId is available
  });

  // Function to update pagination params
  const updatePagination = (newPage: number, newSize: number) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("page", newPage.toString());
    updatedParams.set("size", newSize.toString());
    setSearchParams(updatedParams);
  };

  return {
    ...query,
    page,
    size,
    status,
    updatePagination,
    userType,
  };
};
