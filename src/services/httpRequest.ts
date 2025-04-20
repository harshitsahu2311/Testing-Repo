import axios, { AxiosInstance, AxiosResponse } from "axios";

enum HTTP_METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

interface HttpHeaders {
  [key: string]: string;
}

interface RequestOptions {
  url: string;
  method: HTTP_METHOD;
  data?: any;
  headers?: HttpHeaders;
}

// Create an Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: "http://3.110.46.37:3000/api/v2",
  headers: { "Content-Type": "application/json" },
});

// Request Interceptor: Automatically attach auth token
apiClient.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("auth-token");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API Utility
const api = (() => {
  async function get<T>(url: string): Promise<T> {
    const options: RequestOptions = { url, method: HTTP_METHOD.GET };
    const { data } = await apiClient(options);
    return data;
  }

  async function post<T>(url: string, data: any): Promise<AxiosResponse<T>> {
    const options: RequestOptions = { url, method: HTTP_METHOD.POST, data };
    return await apiClient(options);
  }

  async function put<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    const options: RequestOptions = { url, method: HTTP_METHOD.PUT, data };
    return await apiClient(options);
  }

  async function del<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    const options: RequestOptions = { url, method: HTTP_METHOD.DELETE, data };
    return await apiClient(options);
  }

  return { get, post, put, del };
})();

export default api;
