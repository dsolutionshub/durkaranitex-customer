import axios from "axios";
import { apiRequest } from "./apiClient";
import {
  ADD_CART,
  ADD_CUSTOMER_ADDRESS,
  CATEGORY_LIST,
  DELETE_CUSTOMER_ADDRESS,
  GET_CART,
  GET_CHECKOUT_LIST,
  GET_CUSTOMER_ADDRESS_LIST,
  GET_HOME,
  GET_STATE_LIST,
  GOOGLE_LOGIN,
  HANDLE_CHECKOUT,
  LOGIN_CHECK,
  PRODUCT_DETAIL,
  PRODUCT_LIST,
  PROFILE_INFO,
  REMOVE_WISH_LIST,
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

export async function loginCheck() {
  const response = await apiRequest(LOGIN_CHECK, "GET");
  return response;
}

//Home
export async function getHome() {
  const response = await apiRequest(GET_HOME, "GET");
  return response;
}

// Product
export async function getProductList(page, filter, category) {
  const params = new URLSearchParams();

  if (page) params.append("page", page);
  if (filter) params.append("filter", filter);
  if (category) params.append("category", category);

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
