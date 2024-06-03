import sha256 from "crypto-js/sha256";

import { NextResponse } from "next/server";
import axios from "axios";
import baseUrl, { basePhonePeURL } from "@/helper/baseUrl";
import Order from "@/Modal/Order";
import initDB from "@/helper/initDB";
initDB();
// --------------To Create Product --------------
export const POST = async (req) => {
  try {
    const Data = await req.json();
    const { name, email, amount, mobileNumber, product } = Data;
    if (!name || !email || !amount || !mobileNumber || !product) {
      throw new Error("Fill all the fields");
    }
    const transactionId = "TID" + Date.now();

    const payload = {
      merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
      merchantTransactionId: transactionId,
      merchantUserId: "MID" + Date.now(),
      amount: amount * 100,
      redirectUrl: `${baseUrl}api/PhonePe/Status/${transactionId}`,
      redirectMode: "POST",
      callbackUrl: `${baseUrl}api/PhonePe/Status/${transactionId}`,
      mobileNumber: mobileNumber,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };
    const dataPayload = JSON.stringify(payload);
    const dataBase64 = Buffer.from(dataPayload).toString("base64");
    const fullURL =
      dataBase64 + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY;
    const dataSha256 = sha256(fullURL);

    const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;

    const response = await axios.post(
      `${basePhonePeURL}pay`,
      {
        request: dataBase64,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
        },
      }
    );
    const dataSource = {
      Name: name,
      Email: email,
      Product: product,
      TID: transactionId,
      PayDetail: response.data,
    };
    const redirect = response.data.data.instrumentResponse.redirectInfo.url;
    await Order.create(dataSource);

    return NextResponse.json(
      {
        data: redirect,
        message: response?.data?.code,
        isSuccess: true,
      }
    );
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      success: false,
    });
  }
};
