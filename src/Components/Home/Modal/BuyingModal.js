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
  const { curPayUser, curBuyPID, inVoice } = useAppStore();
  const router = useRouter();
  const [loading, setloading] = useState(false);

  const handlePay = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      if (!curPayUser?.name || !curPayUser?.email) {
        return toast.error("Fill all the fields");
      }
      const res = await axios.post(phonepePayURL, {
        name: curPayUser?.name,
        email: curPayUser?.email,
        amount: curBuyPID?.price,
        product: curBuyPID?.id,
      });
      return router.push(res?.data?.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };



  return (
    <>
      <Modal open={state} onClose={() => setState(false)}>
        <ModalDialog
          className="bg-ground border md:w-[40%] border-gray-700 text-white md:rounded-md rounded-sm"
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
          <StepOne />
          {/* <PaymentInititate
            title={curBuyPID?.name}
            amount={curBuyPID?.price}
            produDID={curBuyPID?.productID}
            productDetailID={curBuyPID?.id}
            setisBuy={setisBuy}
          /> */}

          <DefaultBTN
            clickHandle={handlePay}
            name="Pay Now"
            loading={loading}
            styleCSS="px-5 mt-5 font-semibold  rounded-sm md:rounded-md"
          />

          <button
            onClick={() => setState(false)}
            className=" p-2 border border-gray-700 mt-5"
          >
            Cancel Payment
          </button>
        </ModalDialog>
      </Modal>
    </>
  );
}
