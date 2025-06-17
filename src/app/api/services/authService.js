import { apiRequest } from "./apiClient";
import {
    CATEGORY_LIST,
    GET_CART,
    GET_HOME,
    PRODUCT_DETAIL,
    PRODUCT_LIST,
    REMOVE_WISH_LIST,
    UPDATE_QUANTITY,
    WISH_LIST,
} from "@/app/utils/apiEndpoints";

//Login
export async function googleSignIn(payload){
    const response = await apiRequest(GOOGLE_LOGIN, "POST", payload);
    sessionStorage.setItem('token', response.token)
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