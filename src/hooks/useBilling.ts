import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import {
  fetchBillings,
  blockBilling as blockBillingService,
  unblockBilling as unblockBillingService,
  deleteBillings as deleteBillingsService,
  BillingResponse,
} from "@/services/billingService";
import { useCallback } from "react";

export type StatusType = "all" | "active" | "inactive";

export const useBilling = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const size = Number(searchParams.get("size")) || 10;
  const status = (searchParams.get("status") || "all") as StatusType;
  const search = searchParams.get("search") || "";

  const updateSearchParams = useCallback(
    (params: Record<string, string>) => {
      const newParams = new URLSearchParams(searchParams);

      console.log("params", params);

      Object.entries(params).forEach(([key, value]) => {
        if (value && key === "status" && value.toLowerCase() === "all") {
          // Remove status parameter if "all" is selected
          newParams.delete(key);
        } else if (value) {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });

      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  const queryClient = useQueryClient();

  const query = useQuery<BillingResponse>({
    queryKey: ["billings", page, size, status, search],
    queryFn: () => {
      console.log(`Fetching billings for page: ${page}, size: ${size}`);
      return fetchBillings(
        page,
        size,
        status.toLowerCase() !== "all" ? status : undefined,
        search
      );
    },
    refetchOnMount: false,
  });

  const blockBillingMutation = useMutation({
    mutationFn: (data: { userIds: string[]; blockedReason: string }) =>
      blockBillingService(data.userIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["billings"] });
    },
    onError: (error) => {
      console.error("Error blocking billing:", error);
    },
  });

  const unblockBillingMutation = useMutation({
    mutationFn: (ids: string[]) => unblockBillingService(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["billings"] });
    },
    onError: (error) => {
      console.error("Error unblocking billing:", error);
    },
  });

  const deleteBillingsMutation = useMutation({
    mutationFn: deleteBillingsService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["billings"] });
    },
    onError: (error) => {
      console.error("Error deleting multiple billings:", error);
    },
  });

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage === page) {
        console.log("Skipping page change, already on page:", newPage);
        return;
      }

      console.log("Changing to page:", newPage);
      updateSearchParams({
        page: newPage.toString(),
        size: size.toString(),
      });
    },
    [updateSearchParams, size, page]
  );

  const handleSizeChange = useCallback(
    (newSize: number) => {
      if (newSize === size) {
        console.log("Skipping size change, already using size:", newSize);
        return;
      }

      console.log("Changing size to:", newSize);
      updateSearchParams({
        page: "1",
        size: newSize.toString(),
      });
    },
    [updateSearchParams, size]
  );

  return {
    ...query,
    page,
    size,
    status,
    search,
    blockBilling: blockBillingMutation,
    unblockBilling: unblockBillingMutation,
    deleteBillings: deleteBillingsMutation,
    searchParams,
    setSearchParams,
    updateSearchParams,
    handlePageChange,
    handleSizeChange,
  };
};
