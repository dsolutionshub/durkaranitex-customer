import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  // const token = sessionStorage.getItem("accessToken");

  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzMxNGFiOWJiMDJmMWM2ODgxOGM4YzdlMjYwMGNlN2QyNzI5YzVkMjMyMjY5NzQ0MTY5ZmNmNjc5YTZlMjVhOGZkZjM1ZTEyNGQyOWZlZGIiLCJpYXQiOjE3NDk2MDg4MDAuODU3NDI1LCJuYmYiOjE3NDk2MDg4MDAuODU3NDI4LCJleHAiOjE3ODExNDQ4MDAuODUyNDk2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.IytuGGNus8CITEhFAO4BqxqginhUhyoTtV8oCEoNlal-KwIZraaBErahN75tJsbj_2SwluUC10a_Zz5Smk-Ee3X-ynAMFkwPaq0VJn5AufzcladqeTsOMre8A3vdgUnMZD9iNiU-Evf2MLkWMWtR2ZV7fyKRnFGRK29h0CZnv9M5V-fn0oCIbCVRzRSOJiPckc3XR9L17-5npj1uWZIJsqcycOQ34Bu6zXqIFS0CXfbibb8OSQ1Yxkn9YetVlzGg4JEl42iioSIe2-UhJsSAxYpBMleETxlefQ0WbUENFtbZYpG6d1BKVCaY4Mr9vX5c3h1aqYbzl2G5ZlKpJZnQa_c9qXO9APEhJTipwBwFqfFRiv38ZzagKp9HOhddIASfRubL0HSw4ENzZExeJ6G3ckxW24qSZAbvLxgB3Glav9dZyJ25iCL1itoK0f8BoEuPtYatLNKjtdReEPN5LNXSplti0-euaiTBwON3KmSv8mibLxJIUqksBRTUDm4jfOVvuJTFw-AxPX9L4CGzzlSoMIXuAQzvv1MNbjJyx9OcHVR3k8f71g4zQDkM4geXl1Qhjj9vV1nXlrf3cmWDx4olRAcRdoJ8RwSoX96dKLH1ONYhHQX6G7wiS-qQuZjPXXtCHlCm2gL5m-ge3M4rqbBNNB0D4YISfyEUY5KD8H0sMaI"
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