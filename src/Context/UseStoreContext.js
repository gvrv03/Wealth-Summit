"use client";
import generateRandomString from "@/Functions/generateRandomString";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const useStoreContext = createContext();
export function UseStoreContextProvider({ children }) {
  const [userDetails, setuserDetails] = useState({});
  //----------------------------All Products State //----------------------------
  const [AllProducts, setAllProducts] = useState({
    data: [],
    isLoading: true,
    error: null,
    count: 0,
    totalPages: 0,
  });
  //----------------------------Refresh State----------------------------
  const [refresh, setrefresh] = useState("");
  const handleGenerateRandomString = () => {
    const newRandomString = generateRandomString(10); // Change 20 to the desired length
    setrefresh(newRandomString);
  };
  // Modal States
  const [isUpdateModal, setisUpdateModal] = useState(false);
  const [signOutIsOpen, setsignOutIsOpen] = useState(false);
  return (
    <useStoreContext.Provider
      value={{
        userDetails,
        setuserDetails,
        signOutIsOpen,
        setsignOutIsOpen,
        refresh,
        handleGenerateRandomString,
        isUpdateModal,
        setisUpdateModal,
        AllProducts,
        setAllProducts,
      }}
    >
      {children}
    </useStoreContext.Provider>
  );
}

export function useAppStore() {
  return useContext(useStoreContext);
}
