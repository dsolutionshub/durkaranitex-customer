import axios from "axios";
import { apiRequest } from "./apiClient";
import {
  ADD_CART,
  ADD_CUSTOMER_ADDRESS,
  BUY_NOW,
  CATEGORY_LIST,
  DELETE_CUSTOMER_ADDRESS,
  GET_CART,
  GET_CHECKOUT_LIST,
  GET_CUSTOMER_ADDRESS_LIST,
  GET_HOME,
  GET_SELECTED_ADDRESS,
  GET_STATE_LIST,
  GOOGLE_LOGIN,
  HANDLE_CHECKOUT,
  HANDLE_PAYMENT,
  LOGIN,
  LOGIN_CHECK,
  LOGOUT,
  ORDER_DETAIL,
  ORDER_LIST,
  PRODUCT_DETAIL,
  PRODUCT_LIST,
  PROFILE_INFO,
  REGISTER,
  REMOVE_CART,
  REMOVE_WISH_LIST,
  RESET_LINK,
  RESET_PASSWORD,
  UPDATE_CHECKOUT_ADDRESS,
  UPDATE_CUSTOMER_ADDRESS,
  UPDATE_QUANTITY,
  WISH_LIST,
} from "@/app/utils/apiEndpoints";
import { getErrorMessage } from "@/app/utils/helperFn";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function googleSignIn(payload) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}${GOOGLE_LOGIN}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    getErrorMessage(error);
  }
}

// Login
export async function loginCheck() {
  const response = await apiRequest(LOGIN_CHECK, "GET");
  return response;
}

export async function login(payload) {
  const response = await apiRequest(LOGIN, "POST", payload);
  return response;
}

export async function register(payload) {
  const response = await apiRequest(REGISTER, "POST", payload);
  return response;
}

export async function reset(payload) {
  const response = await apiRequest(RESET_LINK, "POST", payload);
  return response;
}

//Logout
export async function logout() {
  const response = await apiRequest(LOGOUT, "POST");
  return response;
}

//Home
export async function getHome() {
  const response = await apiRequest(GET_HOME, "GET");
  return response;
}

// Product
export async function getProductList(page, filter, category, min, max, search) {
  const params = new URLSearchParams();

  if (page) params.append("page", page);
  if (filter) params.append("filter", filter);
  if (category) params.append("category", category);
  if (min) params.append("price[min]", min);
  if (max) params.append("price[max]", max);
  if (search) params.append("search", search);

  const url = `${PRODUCT_LIST}?${params.toString()}`;

  const response = await apiRequest(url, "GET");
  return response;
}

export async function getCategoryList() {
  const response = await apiRequest(CATEGORY_LIST, "GET");
  return response;
}

export async function getProductDetails(id) {
  const response = await apiRequest(`${PRODUCT_DETAIL}/${id}`, "GET");
  return response;
}

// Wishlist
export async function getWishlist() {
  const response = await apiRequest(WISH_LIST, "GET");
  return response;
}

export async function modifyWishlist(payload) {
  const response = await apiRequest(REMOVE_WISH_LIST, "POST", payload);
  return response;
}

// Cart
export async function getCart() {
  const response = await apiRequest(GET_CART, "GET");
  return response;
}

export async function updateQuantity(payload) {
  const response = await apiRequest(UPDATE_QUANTITY, "POST", payload);
  return response;
}

export async function deleteQuantity(payload) {
  const response = await apiRequest(UPDATE_QUANTITY, "POST", payload);
  return response;
}

export async function modifyCart(payload) {
  const response = await apiRequest(ADD_CART, "POST", payload);
  return response;
}

export async function removeCart(payload) {
  const response = await apiRequest(REMOVE_CART, "POST", payload);
  return response;
}

export async function buyNow(payload) {
  const response = await apiRequest(BUY_NOW, "POST", payload);
  return response;
}

//Address
export async function getStateList() {
  const response = await apiRequest(GET_STATE_LIST, "GET");
  return response;
}

export async function getCustomerAddressList() {
  const response = await apiRequest(GET_CUSTOMER_ADDRESS_LIST, "GET");
  return response;
}

export async function addAddress(payload) {
  const response = await apiRequest(ADD_CUSTOMER_ADDRESS, "POST", payload);
  return response;
}

export async function getSelectAddress(id) {
  const response = await apiRequest(`${GET_SELECTED_ADDRESS}/${id}`, "GET");
  return response;
}

export async function updateAddress(payload, id) {
  const response = await apiRequest(
    `${UPDATE_CUSTOMER_ADDRESS}/${id}`,
    "POST",
    payload
  );
  return response;
}

export async function deleteAddress(payload, id) {
  const response = await apiRequest(
    `${DELETE_CUSTOMER_ADDRESS}/${id}`,
    "POST",
    payload
  );
  return response;
}

//Profile
export async function getProfileInfo() {
  const response = await apiRequest(PROFILE_INFO, "GET");
  return response;
}

//Checkout
export async function handleCheckout() {
  const response = await apiRequest(HANDLE_CHECKOUT, "POST");
  return response;
}

export async function getCheckoutList() {
  const response = await apiRequest(GET_CHECKOUT_LIST, "GET");
  return response;
}

export async function updateCheckoutAddress(payload) {
  const response = await apiRequest(UPDATE_CHECKOUT_ADDRESS, "POST", payload);
  return response;
}

export async function payment(payload) {
  const response = await apiRequest(HANDLE_PAYMENT, "POST", payload);
  return response;
}

//Order Details
export async function getOrderList() {
  const response = await apiRequest(ORDER_LIST, "GET");
  return response;
}

export async function getOrderDetails(id) {
  const response = await apiRequest(`${ORDER_DETAIL}/${id}`, "GET");
  return response;
}

//Reset Password

export async function resetPassword(payload) {
  const response = await apiRequest(RESET_PASSWORD, "POST", payload);
  return response;
}
