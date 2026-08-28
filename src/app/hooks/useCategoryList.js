"use client";

import { useQuery } from "@tanstack/react-query";

import { getCategoryList } from "../api/services/authService";

export const CATEGORY_LIST_QUERY_KEY = ["categoryList"];

export function useCategoryList() {
  return useQuery({
    queryKey: CATEGORY_LIST_QUERY_KEY,
    queryFn: getCategoryList,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}
