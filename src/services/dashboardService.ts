
import api from "./httpRequest";

// New interface to match the API response structure
export interface MetricsResponse {
  activeTickets: {
    value: number;
    change: string;
    direction: "up" | "down";
  };
  resolvedTickets: {
    value: number;
    change: string;
    direction: "up" | "down";
  };
  openedTickets: {
    value: number;
    change: string;
    direction: "up" | "down";
  };
  customerOnboarding: {
    value: number;
    change: string;
    users: number;
  };
}

export interface ChartDataItem {
  date: string;
  rental: number;
  taxi: number;
  granularity: string;
  [key: string]: string | number; // Index signature for dynamic properties
}

export interface DashboardResponse {
  metrics: MetricsResponse;
  onboardingData: ChartDataItem[];
  ticketData: ChartDataItem[];
  openResolvedData: ChartDataItem[];
}

// Transform to the format expected by UI components
export interface DashboardMetric {
  title: string;
  value: number | string;
  change: {
    percent: number;
    direction: "up" | "down";
    since: string;
  };
}

// Modified interface to make properties optional
export interface TransformedChartDataPoint {
  month: string;
  rentalUsers?: number;
  bikeTaxiUsers?: number;
  openTickets?: number;
  resolvedTickets?: number;
  raisedTickets?: number;
  processingTickets?: number;
  [key: string]: string | number | undefined; // Index signature for dynamic properties
}

export interface TransformedDashboardResponse {
  message: string;
  data: {
    metrics: DashboardMetric[];
    onBoardingData: TransformedChartDataPoint[];
    raiseTicketData: TransformedChartDataPoint[];
    openResolvedTickets: TransformedChartDataPoint[];
  };
  code: string;
  errors: null | any;
}

// New interface for recently joined users
export interface RecentlyJoinedUser {
  id?: string;
  name: string;
  avatarUrl: string;
  joinedAt: string;
}

export interface RecentlyJoinedUsersResponse {
  message: string;
  data: RecentlyJoinedUser[];
  code: string;
  errors: null | any;
}

const fetchDashboardData = async (startDate: string, endDate: string): Promise<TransformedDashboardResponse> => {
  try {
    const response = await api.get<DashboardResponse>(`/dashboard?startDate=${startDate}&endDate=${endDate}`);
    
    // Transform the API response to match the expected format in the UI
    const transformedResponse: TransformedDashboardResponse = {
      message: "Success",
      code: "200",
      errors: null,
      data: {
        // Transform metrics to array format - limiting to 3 metrics as requested
        metrics: [
          {
            title: "Active Tickets",
            value: response.metrics.activeTickets.value,
            change: {
              percent: parseFloat(response.metrics.activeTickets.change),
              direction: response.metrics.activeTickets.direction,
              since: "last month"
            }
          },
          {
            title: "Resolved Tickets",
            value: response.metrics.resolvedTickets.value,
            change: {
              percent: parseFloat(response.metrics.resolvedTickets.change),
              direction: response.metrics.resolvedTickets.direction,
              since: "last month"
            }
          },
          {
            title: "Opened Tickets",
            value: response.metrics.openedTickets.value,
            change: {
              percent: parseFloat(response.metrics.openedTickets.change),
              direction: response.metrics.openedTickets.direction,
              since: "last month"
            }
          }
        ],
        
        // Transform chart data for onboarding
        onBoardingData: response.onboardingData.map(item => ({
          month: item.date,
          rentalUsers: item.rental,
          bikeTaxiUsers: item.taxi
        })),
        
        // Transform chart data for tickets
        raiseTicketData: response.ticketData.map(item => ({
          month: item.date,
          raisedTickets: item.rental,
          processingTickets: item.taxi
        })),
        
        // Transform chart data for open/resolved tickets
        openResolvedTickets: response.openResolvedData.map(item => ({
          month: item.date,
          openTickets: item.rental,
          resolvedTickets: item.taxi
        }))
      }
    };
    
    return transformedResponse;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

// For recently joined users
const fetchRecentlyJoinedUsers = async (): Promise<RecentlyJoinedUsersResponse> => {
  try {
    const response = await api.get<RecentlyJoinedUsersResponse>("/users/recently-joined");
    return response;
  } catch (error) {
    console.error("Error fetching recently joined users:", error);
    throw error;
  }
};

export default {
  fetchDashboardData,
  fetchRecentlyJoinedUsers,
};
