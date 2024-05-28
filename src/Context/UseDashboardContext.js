"use client";
import { getUser, updateURole } from "@/API/Authentication/Auth";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from "react-hot-toast";
import { useAppStore } from "./UseStoreContext";

const useDashboardContext = createContext();
export function UseDashboardContextProvider({ children }) {
  const { handleGenerateRandomString } = useAppStore();
  //-------------------get UUser Role -------------------
  const getUserRoles = async (id, setuserRole) => {
    try {
      const res = await getUser(id);
      if (res?.isSuccess) {
        return setuserRole(res);
      }
    } catch (error) {
      return toast.error(
        error?.response ? error?.response?.data?.errorMsg : error?.message
      );
    }
  };

  const updateUserRole = async (roleID, roleName) => {
    try {
      const res = await updateURole({
        roleID,
        roleName,
      });
      if (res?.isSuccess) {
        handleGenerateRandomString();
        return toast.success(res?.message);
      }
    } catch (error) {
      return toast.error(
        error?.response ? error?.response?.data?.errorMsg : error?.message
      );
    }
  };

  return (
    <useDashboardContext.Provider
      value={{ getUserRoles, updateUserRole, updateUserRole }}
    >
      {children}
    </useDashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(useDashboardContext);
}
