import crypto from "crypto";
import initDB from "@/helper/initDB";
initDB();

import { NextResponse } from "next/server";
import axios from "axios";
const saltKey = "aahjfskajshf849753yhfjkshfjkhfjkshfjks";

// --------------To Create Product --------------
export const POST = async (request) => {
  try {
    // const { OID, PID, verifier } = await request.json();
    const merchantId = "PGTESTAYUAT";
    const transactionID = "MT7850590068188104";
    const peData = {
      merchantId,
      merchantTransactionId: transactionID,
      merchantUserId: "MUID123",
      amount: 1,
      redirectUrl: "https://webhook.site/redirect-url",
      redirectMode: "REDIRECT",
      callbackUrl: "https://webhook.site/callback-url",
      mobileNumber: "8805950201",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const payload = JSON.stringify(peData);
    const payloadMain = Buffer.from(payload).toString("base64");
    const keyIndex = 1;
    const string = payloadMain + "/pg/v1/pay" + saltKey;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;
    const url = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
    // const res = await axios.post(
    //   url,
    //   {
    //     request: payloadMain,
    //   },
    //   {
    //     headers: {
    //       accept: "application/json",
    //       "Content-Type": "application/json",
    //       "X-VERIFY": checksum,
    //     }
    //   }
    // );
    // const data = await res?.data;

    const options = {
      method: "post",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      body: JSON.stringify({
        request: payloadMain,
      }),
    };
    const res = await fetch(url, options);
    const data = await res?.json();

    return NextResponse.json(
      {
        data: data,
        message: "Payment Initiate",
        isSuccess: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json({
      data: null,
      error: error.message,
      isSuccess: false,
    });
  }
};
