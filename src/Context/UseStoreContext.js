"use client";
import { SendEmailAPI } from "@/API/Email/SendMail";
import generateRandomString from "@/Functions/generateRandomString";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from "react-hot-toast";

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
  const [isBuyingOpen, setisBuyingOpen] = useState(false);
  const [curBuyPID, setcurBuyPID] = useState({});

  //Cur pay User
  const [curPayUser, setcurPayUser] = useState(null);

  //-----------Send an Email -----------
  const sendEmail = async ({
    userEmails,
    subject,
    emailData,
    ProductDetail,
  }) => {
    const { error } = await SendEmailAPI({
      userEmails,
      subject,
      emailData,
      ProductDetail,
    });
    if (error) {
      return toast.error(error.message);
    }
    return toast.success("Email Send");
  };

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
        isBuyingOpen,
        setisBuyingOpen,
        curBuyPID,
        setcurBuyPID,
        setcurPayUser,
        curPayUser,
        sendEmail,
      }}
    >
      {children}
    </useStoreContext.Provider>
  );
}

export function useAppStore() {
  return useContext(useStoreContext);
}
