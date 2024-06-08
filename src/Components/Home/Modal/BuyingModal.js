"use client";
import * as React from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { useAppStore } from "@/Context/UseStoreContext";
import StepOne from "../PaymentSteps/StepOne";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DefaultBTN } from "../Utility/Utility";
import axios from "axios";
import { toast } from "react-hot-toast";
import { phonepePayURL } from "@/helper/allLinks";

export default function BuyingModal({ state, setState }) {
  const { curBuyPID } = useAppStore();

  return (
    <>
      <Modal open={state} onClose={() => setState(false)}>
        <ModalDialog
          className="bg-ground border md:w-[30%] border-gray-700 text-white md:rounded-md rounded-sm"
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
          sx={(theme) => ({
            [theme.breakpoints.only("xs")]: {
              top: "unset",
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
              transform: "none",
              maxWidth: "unset",
            },
          })}
        >
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">{curBuyPID?.name}</h2>
            <h2>₹{curBuyPID?.price}</h2>
          </div>
          <StepOne pID={curBuyPID?.id} pPrice={curBuyPID?.price} />

          {/* <button
            onClick={() => setState(false)}
            className=" p-2 border border-gray-700 mt-5"
          >
            Cancel Payment
          </button> */}
        </ModalDialog>
      </Modal>
    </>
  );
}
