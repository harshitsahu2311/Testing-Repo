import { AnalyticsResponse } from "./customerService";
import api from "./httpRequest";

export interface BillingResponse {
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

export interface BillingDetailResponse {
  data: any; // Single billing object
}

export const fetchBillings = async (
  page: number,
  size: number,
  status?: string,
  search?: string
): Promise<BillingResponse> => {
  // Build URL with query parameters
  let url = `/users/taxi?page=${page}&size=${size}`;
  if (status) url += `&status=${status}`;
  if (search) url += `&search=${search}`;

  const data = await api.get<BillingResponse>(url);
  return data;
};

/**
 * Fetch a single billing record by ID
 */
export const fetchBillingById = async (
  id: string
): Promise<BillingDetailResponse> => {
  const url = `/users/taxi/${id}`;
  return await api.get<BillingDetailResponse>(url);
};

/**
 * Fetch analytics data for a customer by ID
 */
export const fetchTaxiAnalytics = async (
  id: string
): Promise<AnalyticsResponse> => {
  const url = `/users/taxi-analytics/${id}`;
  return await api.get<AnalyticsResponse>(url);
};

/**
 * Block taxi/billing users by their IDs
 */
export const blockBilling = async (ids: string[]) => {
  const url = "/users/block/taxi";
  return await api.post(url, {
    userIds: ids,
    blockedReason: "Violation of terms of service",
  });
};

/**
 * Unblock taxi/billing users by their IDs
 */
export const unblockBilling = async (ids: string[]) => {
  const url = "/users/unblock/taxi";
  return await api.post(url, {
    userIds: ids,
    blockedReason: "Violation of terms resolved",
  });
};

/**
 * Delete multiple billing users
 */
export const deleteBillings = async (ids: string[]) => {
  const url = "/users/taxi/delete";
  return await api.post(url, {
    userIds: ids,
    deleteReason: "User account deletion requested",
  });
};
