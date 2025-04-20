
import api from "./httpRequest";

export interface Activity {
  time: string;
  title: string;
  description: string;
  type?: string;
  eventType?: string;
  details?: {
    customerId?: string;
    actionLink?: string;
    [key: string]: any;
  };
}

export interface ActivityGroup {
  date: string;
  activities: Activity[];
}

export interface ActivityResponse {
  message: string;
  data: ActivityGroup[];
  code: string;
  errors: null | any;
}

export const fetchActivities = async (startDate?: string, endDate?: string): Promise<ActivityResponse> => {
  try {
    let url = "/activities";
    
    // Add date range parameters if provided
    if (startDate && endDate) {
      url += `?startDate=${startDate}&endDate=${endDate}`;
    }
    
    const response = await api.get<ActivityResponse>(url);
    return response;
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw error;
  }
};
