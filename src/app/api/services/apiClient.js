import axios from "axios";
import { getErrorMessage } from "@/app/utils/helperFn";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    const defaultMessages = {
      400: "Invalid request",
      401: "Unauthorized, please log in",
      403: "Forbidden",
      500: "Something went wrong, try again later",
    };

    const errorMessage =
      error.response?.data?.message || defaultMessages[status] || error.message;

    console.error(`API Error [${status}]:`, errorMessage);

    return Promise.reject(new Error(errorMessage));
  }
);

export async function apiRequest(endpoint, method = "GET", body = null) {
  try {
    const response = await axiosInstance({
      url: endpoint,
      method,
      data: body,
    });

    return response.data;
  } catch (error) {
    getErrorMessage(error);
  }
}
