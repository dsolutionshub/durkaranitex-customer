import { apiRequest } from "./apiClient";
import {
    ADD_CART,
    ADD_CUSTOMER_ADDRESS,
    CATEGORY_LIST,
    DELETE_CUSTOMER_ADDRESS,
    GET_CART,
    GET_CUSTOMER_ADDRESS_LIST,
    GET_HOME,
    GET_STATE_LIST,
    GOOGLE_LOGIN,
    LOGIN_CHECK,
    PRODUCT_DETAIL,
    PRODUCT_LIST,
    REMOVE_WISH_LIST,
    UPDATE_CUSTOMER_ADDRESS,
    UPDATE_QUANTITY,
    WISH_LIST,
} from "@/app/utils/apiEndpoints";

//Login
export async function googleSignIn(payload){
    const response = await apiRequest(GOOGLE_LOGIN, "POST", payload);
    return response;
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
  const params = new URLSearchParams({ page });

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
export async function getStateList(){
    const response = await apiRequest(GET_STATE_LIST, 'GET')
    return response
}

export async function getCustomerAddressList(){
    const response = await apiRequest(GET_CUSTOMER_ADDRESS_LIST, 'GET')
    return response
}

export async function addAddress(payload) {
    const response = await apiRequest(ADD_CUSTOMER_ADDRESS, "POST", payload);
    return response;
}

export async function updateAddress(payload, id) {
    const response = await apiRequest(`${UPDATE_CUSTOMER_ADDRESS}/${id}`, "POST", payload);
    return response;
}

export async function deleteAddress(payload, id) {
    const response = await apiRequest(`${DELETE_CUSTOMER_ADDRESS}/${id}`, "POST", payload);
    return response;
}