import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import api from "@/services/httpRequest";
import { useCallback, useEffect, useState } from "react";

interface TicketUser {
  name: string;
  avatarUrl: string;
}

interface TicketAttachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadedAt: string;
}

export interface TicketComment {
  createdAt: string;
  createdBy: string;
  comment: string;
}

export interface Ticket {
  id: string;
  ticketId: string | null;
  description: string;
  user: TicketUser;
  createdAt: string;
  subject: string;
  ticket_status: string;
  customerType: string;
  department: string;
  location: string;
  mapUrl: string | null;
  attachments: TicketAttachment[];
  comments?: TicketComment[];
}

interface TicketResponse {
  message: string;
  data: Ticket[];
  code: string;
  errors: null | any;
  page: {
    previous: number | null;
    current: number;
    next: number | null;
    total: number;
    size: number;
    records: {
      total: number;
      onPage: number;
    };
  };
}

const fetchTickets = async (status?: string, search?: string) => {
  const params: Record<string, any> = {};
  if (status) params.status = status.toLowerCase();
  if (search) params.search = search;

  const queryString = new URLSearchParams(params).toString();
  const { data } = await api.get<TicketResponse>(`/tickets?${queryString}`);
  return data;
};

// Function to add a comment to a ticket
const addTicketComment = async (ticketId: string, message: string) => {
  const payload = { message };
  const response = await api.post(`/tickets/${ticketId}/comments`, payload);
  return response.data;
};

export const useTickets = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [debouncedSearchParams, setDebouncedSearchParams] =
    useState<URLSearchParams>(searchParams);

  // Read params from URL or fallback to defaults
  const status = debouncedSearchParams.get("status") || undefined;
  const search = debouncedSearchParams.get("search") || undefined;

  // Apply debounce to search params changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchParams(searchParams);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchParams]);

  const query = useQuery({
    queryKey: ["tickets", status, search],
    queryFn: () => fetchTickets(status, search),
    refetchOnMount: false,
  });

  // Mutation for adding a comment
  const useAddTicketComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({
        ticketId,
        message,
      }: {
        ticketId: string;
        message: string;
      }) => addTicketComment(ticketId, message),
      onSuccess: () => {
        // Invalidate and refetch tickets to get updated comments
        queryClient.invalidateQueries({ queryKey: ["tickets"] });
      },
    });
  };

  // Extract tickets data safely
  const tickets = query.data;

  // Function to update search params
  const updateSearchParams = useCallback(
    (newStatus?: string, newSearch?: string) => {
      const updatedParams = new URLSearchParams(searchParams);

      if (newStatus) {
        updatedParams.set("status", newStatus);
      } else {
        updatedParams.delete("status");
      }

      if (newSearch) {
        updatedParams.set("search", newSearch);
      } else {
        updatedParams.delete("search");
      }

      setSearchParams(updatedParams);
    },
    [searchParams, setSearchParams]
  );

  return {
    ...query,
    data: tickets,
    status,
    search,
    updateSearchParams,
    refetch: query.refetch,
    useAddTicketComment,
  };
};
