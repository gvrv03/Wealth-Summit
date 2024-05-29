import initDB from "@/helper/initDB";
import ProductDetail from "@/Modal/ProductDetail";
import { NextResponse } from "next/server";
initDB();

// to fetch single Product
export const GET = async (req, { params }) => {
  try {
    const getProduct = await ProductDetail.findById(params.pid);
    const update = { views: getProduct.views + 1 };
    const afterUpdate = await ProductDetail.findByIdAndUpdate(
      params.pid,
      update
    );
    return NextResponse.json(afterUpdate);
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      errorMsg: "Internal Server Error",
      isSuccess: false,
    });
  }
};
