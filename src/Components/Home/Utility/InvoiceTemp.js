"use client";
import { useAppStore } from "@/Context/UseStoreContext";
import React from "react";
import { DefaultBTN } from "./Utility";

const InvoiceTemp = ({ inVoice }) => {
  const { handleGeneratePDF, reportTemplateRef, download } = useAppStore();
  return (
    <div>
      <div
        ref={reportTemplateRef}
        className="text-white bg-ground"
        dangerouslySetInnerHTML={{ __html: inVoice }}
      />
      {inVoice && (
        <DefaultBTN
          loading={download}
          name="Download Invoice"
          clickHandle={handleGeneratePDF}
          styleCSS="border border-gray-700 p-2 w-full mt-2"
        />
      )}
    </div>
  );
};

export default InvoiceTemp;
