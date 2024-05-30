"use client";
import { SendEmailAPI } from "@/API/Email/SendMail";
import generateRandomString from "@/Functions/generateRandomString";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from "react-hot-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

const useStoreContext = createContext();
export function UseStoreContextProvider({ children }) {
  const [userDetails, setuserDetails] = useState({});
  const [download, setdownload] = useState(false);

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
  const [inVoice, setinVoice] = useState("");
  const sendEmail = async ({
    userEmails,
    subject,
    emailData,
    ProductDetail,
  }) => {
    const { error, Data } = await SendEmailAPI({
      userEmails,
      subject,
      emailData,
      ProductDetail,
    });
    if (error) {
      return toast.error(error.message);
    }
    await setinVoice(Data);
    return toast.success("Email Send");
  };

  const reportTemplateRef = useRef();
  // generate Invoice
  const handleGeneratePDF = async () => {
    const input = reportTemplateRef.current;
    setdownload(true);
    try {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("Invoice.pdf");
      toast.success("Invoice Downloaded");
    } catch (error) {
      toast.error("Error Occur : ", error);
    } finally {
      setdownload(false);
    }
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
        inVoice,
        handleGeneratePDF,
        reportTemplateRef,
        download,
      }}
    >
      {children}
    </useStoreContext.Provider>
  );
}

export function useAppStore() {
  return useContext(useStoreContext);
}
