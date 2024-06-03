import { NextResponse } from "next/server";
import sha256 from "crypto-js/sha256";
import axios from "axios";
import baseUrl, { basePhonePeURL } from "@/helper/baseUrl";
import initDB from "@/helper/initDB";
import Order from "@/Modal/Order";
import { SendEmailAPI } from "@/API/Email/SendMail";
import { sendEmailURL } from "@/helper/allLinks";
initDB();
export async function POST(req, res) {
  const data = await req.formData();

  const status = data.get("code");
  const merchantId = data.get("merchantId");
  const transactionId = data.get("transactionId");

  const st =
    `/pg/v1/status/${merchantId}/${transactionId}` +
    process.env.NEXT_PUBLIC_SALT_KEY;
  const dataSha256 = sha256(st);
  const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;
  const options = {
    method: "GET",
    url: `${basePhonePeURL}status/${merchantId}/${transactionId}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
      "X-MERCHANT-ID": `${merchantId}`,
    },
  };

  // CHECK PAYMENT STATUS
  const response = await axios.request(options);

  await Order.findOneAndUpdate(
    { TID: transactionId },
    { PayDetail: response?.data }
  );

  if (response.data.code == "PAYMENT_SUCCESS") {
    await axios.post(sendEmailURL, {
      TID: transactionId,
    });
    return NextResponse.redirect(`${baseUrl}Success?TID=${transactionId}`, {
      status: 301,
    });
  } else
    return NextResponse.redirect(`${baseUrl}Failure`, {
      status: 301,
    });
}
