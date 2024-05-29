"use client";
import { AddProduct, fetchProductsAPI } from "@/API/Products/ProductAPI";
import { useCallback, useContext } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { useAppStore } from "./UseStoreContext";
const useProductContext = createContext();

export function UseProductContexProvider({ children }) {
  const { setAllProducts } = useAppStore();
  const fetchProducts = async (data) => {
    try {
      setAllProducts({
        data: [],
        isLoading: true,
        error: null,
        count: 0,
        totalPages: 0,
      });
      const productData = await fetchProductsAPI(data);
      return setAllProducts({
        data: productData?.products,
        isLoading: false,
        count: productData?.ProductCount,
        totalPages: productData?.totalPages,
      });
    } catch (error) {
      setAllProducts({
        data: [],
        isLoading: false,
        count: 0,
        error: error?.message,
        totalPages: 0,
      });
      return toast.error(error?.message);
    }
  };
  // For Add An Product  TO  DB

  const createProduct = async (data) => {
    try {
      const res = await AddProduct(data);
      if (!res?.isSuccess) {
        return toast.error(res?.error);
      }
      return toast.success(res?.message);
    } catch (error) {
      return toast.error(
        error?.response ? error?.response?.data?.error : error?.message
      );
    }
  };

  return (
    <useProductContext.Provider
      value={{
        fetchProducts,
        createProduct,
      }}
    >
      {children}
    </useProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(useProductContext);
}
