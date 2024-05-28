import initDB from "@/helper/initDB";
import razorpayConfig from "@/config/razorpayConfig";
import Order from "@/Modal/Order";
initDB();

import { NextResponse } from "next/server";

// --------------To Create Product --------------
export const POST = async (request) => {
  try {
    const { options, User, pID } = await request.json();
    const response = await razorpayConfig.orders.create(options);
    console.log(response);
    await Order.create({ ...response, User, Product: pID });

    return NextResponse.json(
      {
        data: response,
        message: "Order Create",
        isSuccess: true,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: "Internal Server Error",
        errorMsg: error.message,
        isSuccess: false,
      },
      {
        status: 500,
      }
    );
  }
};

