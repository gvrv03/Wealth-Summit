import initDB from "@/helper/initDB";
import Authentication from "@/Middleware/Authentication";
import Order from "@/Modal/Order";
import ProductDetail from "@/Modal/ProductDetail";
initDB();

import { NextResponse } from "next/server"; // --------------To Fetch All Products--------------
export const GET = Authentication(async (request, UserID) => {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const page = parseInt(searchParams.get("page")); // Retrieves the value of the 'page' parameter
    const limit = parseInt(searchParams.get("limit")); // Retrieves the value of the 'limit' parameter
    const skipCount = (page - 1) * limit;
    const orderCount = await Order.countDocuments({ User: UserID }); // Get the total count of blogs
    const totalPages = Math.ceil(orderCount / limit); // Calculate the total number of pages
    await ProductDetail.countDocuments();
    const orders = await Order.find({ User: UserID })
      .populate("Product")
      .sort({ createdAt: -1 })
      .skip(skipCount)
      .limit(limit);
    if (orders) {
      return NextResponse.json({
        isSuccess: true,
        orders,
        totalPages,
        orderCount,
      });
    }
    throw new Error("No Orders Found");
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        errorMsg: error.message,
        isSuccess: false,
      },
      {
        status: 500,
      }
    );
  }
});
