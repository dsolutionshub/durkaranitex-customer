import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  // const token = sessionStorage.getItem("accessToken");

  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzM3YTI0ZjMyMjQ0Nzg0ZTU3ZjFmYjkxYTNiZWQwZDQwMGVkNjI4YTAwNWFiZTk0ODdhMzc0OGIyZjdkMjQ4MzRmYzMxZjMyMDU3NTk4MTgiLCJpYXQiOjE3NTA2MDEyODkuMzc0Mzc1LCJuYmYiOjE3NTA2MDEyODkuMzc0Mzc4LCJleHAiOjE3ODIxMzcyODkuMzcxNTc1LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.owG7QodpnMsoyaDwYi-QTort1GRG75Rz_cfpaLxkmrF6wWd85ODXKqghl7_BAst1s6qR1B3Gv8t5J8NY34T_QKuVS73Vb6ftyS8nGO-6lYOZceHNRyYO8Qqv5iURQ78wCfLQrCJJKsIUZ14RK0i83DvxylOimgkHGo_xIo7ogpmPwigHg_FayGvm64iwciXZFQlNVS6uC9pLLxU_L3H7ZJw2WbxW0D9Jmi1ElPGpbzAVWUYwjHBk2A_YhAmA_7YWMz-nTv7LudKL-z2eKl77MONkAWuEndzRVnWcH4htUaieHBVbCIjw-q-qo_dw80Mop4DSa37z_snty1-rtuM8nsaUMvJkyyZs63BTilJBitzZPqxrlRn64cPBhAneIJ6tS-qcoAL7b2G8Gi0ouB2kVlh2QGSpJAuhny98LAF9RCNQSJCPFTYamV96GSk_zaaB3ZvU0sMg4rFcxRtwxWEG7IlDKxoWwgxfyybteyJJnPck3vqrdVFXbi2UxUTN06Mzlv8SVdIZRAC4Sqn7Odmsu_N3_2EYAZnpgLwRhyXBpQPucW-MQI5xcS2u5IoIhva5ajyTPX00flR9Y3LdzHWSVK93cuVuCS_BiBxXp6jojIQ-MCs71xGhWa9VkUWUZGs3rKvddDspxJfMD6OzJ_TfUgxCvcuezGvrHFohhP9Y_4U"
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
    throw error;
  }
}