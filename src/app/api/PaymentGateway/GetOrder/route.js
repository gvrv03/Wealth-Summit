import initDB from "@/helper/initDB";
import razorpayConfig from "@/config/razorpayConfig";
import Order from "@/Modal/Order";
initDB();

import { NextResponse } from "next/server";
import ProductDetail from "@/Modal/ProductDetail";

// --------------To Create Product --------------
export const POST = async (request) => {
  try {
    const { OID, verifier } = await request.json();
    const order = await razorpayConfig.orders.fetch(OID);
    await Order.findOneAndUpdate({ id: OID }, { ...order, ...verifier });
    return NextResponse.json(
      {
        data: order,
        message: "Orders Fetch",
        isSuccess: true,
      },
      {
        status: 200,
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


// --------------To Fetch All Saved Prodct--------------
export const GET = async (request) => {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
   
    const page = searchParams.get("page"); // Retrieves the value of the 'page' parameter
    const limit = searchParams.get("limit"); // Retrieves the value of the 'limit' parameter
    const query = searchParams.get("query"); // Retrieves the value of the 'query' parameter  Ex : ?query={"_id":"649ec1dc0227a5b8da286425"}
   
    const skipCount = (page - 1) * limit;
    const orderCount = await Order.countDocuments(); // Get the total count of blogs
    const totalPages = Math.ceil(orderCount / limit); // Calculate the total number of pages
    await ProductDetail.countDocuments();

    const orders = await Order.find(JSON.parse(query))
      .populate("Product")
      .sort({ createdAt: -1 })
      .skip(skipCount)
      .limit(limit);
    return NextResponse.json({
      isSuccess: true,
      orders,
      totalPages,
      orderCount,
    });
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: error.message,
        errorMsg: "Internal Server Error",
        isSuccess: false,
      },
      {
        status: 500,
      }
    );
  }
};