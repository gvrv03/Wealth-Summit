"use client";
import InvoiceTemp from "@/Components/Home/Utility/InvoiceTemp";
import { useAppStore } from "@/Context/UseStoreContext";
import React from "react";

const Invoice = () => {
  const { inVoice } = useAppStore();

  return (
    <div className="" >
      <InvoiceTemp inVoice={inVoice} />
    </div>
  );
};

export default Invoice;
