"use client";
import { getOrder, getUserOrderAPI } from "@/API/Products/OrderAPI";
import { useContext } from "react";
import { createContext } from "react";
import { toast } from "react-hot-toast";
import { useAppStore } from "./UseStoreContext";
const useOrderContext = createContext();
export function UseOrderContexProvider({ children }) {
  const { setuserOrders } = useAppStore();

  const fetchUserOrders = async (data) => {
    try {
      setuserOrders({
        data: [],
        isLoading: true,
        error: null,
        count: 0,
        totatlPages: 0,
      });
      const OrderData = await getUserOrderAPI(data);
      return setuserOrders({
        data: OrderData?.orders,
        isLoading: false,
        count: OrderData?.orderCount,
        totatlPages: OrderData?.totalPages,
      });
    } catch (error) {
      console.log(error);
      return toast.error(
        error?.response ? error?.response?.data?.errorMsg : error?.message
      );
    }
  };

  return (
    <useOrderContext.Provider value={{ fetchUserOrders }}>
      {children}
    </useOrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(useOrderContext);
}
