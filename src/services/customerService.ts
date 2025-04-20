import api from "./httpRequest";

export interface Document {
  file_name: string;
  file_url: string;
}

export interface RentalUser {
  address: string;
  avatar: string;
  customer_id: string;
  date_of_birth: string;
  documents: Document[];
  email: string;
  first_name: string;
  gender: string;
  id: string;
  last_name: string;
  license: string;
  location: string;
  middle_name: string | null;
  name: string;
  phone: string;
  rating: string;
  status: string;
  totalRides: number;
}

export interface CustomerResponse {
  data: RentalUser[];
  name?: string;
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

export interface CustomerDetailResponse {
  data: RentalUser;
  message: string;
  errors: null | any;
  code: string;
}

export interface AnalyticsValue {
  label: string;
  value: number;
}

export interface AnalyticsResponse {
  message: string;
  data: {
    totalRides: number;
    values: AnalyticsValue[];
  };
  code: string;
  errors: null | any;
}

/**
 * Fetches customers with pagination and optional filters
 */
export const fetchCustomers = async (
  page: number = 1,
  size: number = 10,
  status?: string,
  search?: string
): Promise<CustomerResponse> => {
  // Build query parameters
  const queryParams = new URLSearchParams();
  queryParams.append("page", page.toString());
  queryParams.append("size", size.toString());

  // Only add status parameter if it's defined and not empty
  if (status) queryParams.append("status", status);
  if (search) queryParams.append("search", search);

  const url = `/users/rental?${queryParams.toString()}`;
  console.log("Fetching customers with URL:", url);

  try {
    const response = await api.get<CustomerResponse>(url);
    console.log("Customer API response for page", page, ":", response.page);
    return response;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

/**
 * Fetch a single customer by ID
 */
export const fetchCustomerById = async (
  id: string
): Promise<CustomerDetailResponse> => {
  const url = `/users/rental/${id}`;
  return await api.get<CustomerDetailResponse>(url);
};

/**
 * Fetch analytics data for a customer by ID
 */
export const fetchCustomerAnalytics = async (
  id: string
): Promise<AnalyticsResponse> => {
  const url = `/users/rental-analytics/${id}`;
  return await api.get<AnalyticsResponse>(url);
};

/**
 * Block rental customers by their IDs
 */
export const blockCustomer = async (ids: string[]) => {
  const url = "/users/block/rental";
  return await api.post(url, {
    userIds: ids,
    blockedReason: "Violation of terms of service",
  });
};

/**
 * Unblock rental customers by their IDs
 */
export const unblockCustomer = async (ids: string[]) => {
  const url = "/users/unblock/rental";
  return await api.post(url, {
    userIds: ids,
    blockedReason: "Violation of terms resolved",
  });
};

/**
 * Delete multiple customers
 */
export const deleteUsers = async (ids: string[]) => {
  const url = "/users/rental/delete";
  return await api.post(url, {
    userIds: ids,
    deleteReason: "Violation of terms of service",
  });
};
