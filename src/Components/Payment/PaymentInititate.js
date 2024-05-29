"use client";
import axios from "axios";
import { toast } from "react-hot-toast";
import React, { useState } from "react";
import { useAppStore } from "@/Context/UseStoreContext";
import { DefaultBTN } from "../Home/Utility/Utility";
import { createOrderURL } from "@/helper/allLinks";

function generateOrderId() {
  const min = 1000000000; // Minimum 10-digit number
  const max = 9999999999; // Maximum 10-digit number
  const orderId = Math.floor(Math.random() * (max - min + 1)) + min;
  return "OID" + orderId.toString();
}

const PaymentInititate = ({ amount, produDID, title, productDetailID }) => {
  const [loading, setloading] = useState(false);
  const { curPayUser } = useAppStore();

  //PAyemnt Integration
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setloading(true);
    if (!curPayUser?.name || !curPayUser?.email || !curPayUser) {
      setloading(false);
      return toast.error("Fill the Fields");
    }

    // Create order API
    let orderID = generateOrderId();

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      setloading(false);
      return toast.error("Razorpay SDK failed to load");
    }

    let options = {
      amount: amount * 100,
      currency: "INR",
      receipt: orderID,
      payment_capture: 1,
    };

    const result = await axios.post(createOrderURL, {
      options: options,
      User: { name: curPayUser?.name, email: curPayUser?.email },
      pID: productDetailID,
    });

    const { data } = result;

    //Redirection
    if (!data.data) {
      setloading(false);
      return toast.error("Server Error, Are you online!");
    } else {
      const __DEV__ = document.domain === "localhost";
      let option = {
        key: "rzp_test_KNouXSjozBeQpO", // Replace with your Razorpay API key
        amount: data.data.amount, // Payment amount in paise or smallest currency unit
        currency: "INR", // Currency code
        name: "Wealth Summit", // Payment recipient name
        description: title, // Payment description
        image: "/logo.jpg", // URL of your store's logo
        order_id: data.data.id, // Unique order ID generated on the server-side
        handler: async (response) => {
          await postPayment(response);
        },
        // prefill: {
        //   name: "Gaurav Narnaware", // Customer name
        //   email: "gauravnarnaware3112003@gmail.com", // Customer email
        //   //   contact: "7796305801", // Customer contact number
        // },
        notes: {
          address: "",
        },
        theme: {
          color: "#00176b",
        },
      };
      let paymentOBJ = new window.Razorpay(option);
      setloading(false);
      paymentOBJ.open();
    }
  };

  const postPayment = async (response) => {
    setloading(true);
    if (response.razorpay_payment_id) {
      await axios.post("/api/PaymentGateway/GetOrder", {
        OID: response.razorpay_order_id,
        verifier: response,
      });

      setloading(false);
      return toast.success("Payment Success");
    } else {
      setloading(false);
      return toast.error("Payment unsuccessful");
    }
  };

  return (
    <DefaultBTN
      name="Buy Now"
      loading={loading}
      clickHandle={() => {
        handlePayment();
      }}
    />
  );
};

export default PaymentInititate;
