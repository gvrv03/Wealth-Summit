import initDB from "@/helper/initDB";
initDB();
import { NextResponse } from "next/server";
import Product from "@/Modal/Product";

// --------------To Download Product--------------
export const POST = async (request) => {
  try {
    const Data = await request.json();
    const { pid } = Data;

    const getProduct = await Product.findById(pid);
    if (getProduct) {
      return NextResponse.json(getProduct.Product);
    }
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
