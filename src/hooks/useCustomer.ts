import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import {
  fetchCustomers,
  blockCustomer,
  unblockCustomer,
  deleteUsers,
  CustomerResponse,
} from "@/services/customerService";
import { useCallback } from "react";
import useUpdateSearchParams from "./useUpdateSearchParams";

export const useCustomer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  const queryClient = useQueryClient();

  const page = Number(searchParams.get("page")) || 1;
  const size = Number(searchParams.get("size")) || 10;
  const status = searchParams.get("status") || "all";
  const search = searchParams.get("search") || "";

  const query = useQuery<CustomerResponse>({
    queryKey: ["customers", page, size, status, search],
    queryFn: () => {
      console.log(`Fetching customers for page: ${page}, size: ${size}`);
      return fetchCustomers(
        page,
        size,
        status.toLowerCase() !== "all" ? status : undefined,
        search
      );
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const blockUserMutation = useMutation({
    mutationFn: (ids: string[]) => blockCustomer(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error) => {
      console.error("Error blocking user:", error);
    },
  });

  const unblockUserMutation = useMutation({
    mutationFn: (ids: string[]) => unblockCustomer(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error) => {
      console.error("Error unblocking user:", error);
    },
  });

  const deleteUsersMutation = useMutation({
    mutationFn: deleteUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error) => {
      console.error("Error deleting multiple users:", error);
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
    blockUser: blockUserMutation,
    unblockUser: unblockUserMutation,
    deleteUsers: deleteUsersMutation,
    searchParams,
    setSearchParams,
    updateSearchParams,
    handlePageChange,
    handleSizeChange,
  };
};
