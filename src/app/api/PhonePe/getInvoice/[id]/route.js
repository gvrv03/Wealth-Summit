import initDB from "@/helper/initDB";
import { NextResponse } from "next/server";
import Order from "@/Modal/Order";
initDB();

// to fetch single Invoice
export const GET = async (req, { params }) => {
  try {
    const getOrder = await Order.findOne({ TID: params?.id });
    if (!getOrder) {
      throw new Error("Not Found");
    }
    return NextResponse.json({
      data: getOrder,
      message: "Data Fetched",
      isSuccess: true,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      isSuccess: false,
    });
  }
};
