import initDB from "@/helper/initDB";
import ProductDetail from "@/Modal/ProductDetail";
import { NextResponse } from "next/server";
import ProductActual from "@/Modal/Product";
import RootAuth from "@/Middleware/RootAuth";
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

// --------------To Add Product--------------
export const POST = RootAuth(async (request) => {
  try {
    const Data = await request.json();
    const { productDetail, product, pID } = Data;
    const {
      addeBy,
      title,
      description,
      artical,
      images,
      thumbnail,
      status,
      userImages,
    } = productDetail;
    if (
      !addeBy ||
      !title ||
      !description ||
      !artical ||
      !images ||
      !thumbnail ||
      !status ||
      !userImages
    ) {
      throw new Error("Fill all the Fields!");
    }
    // --------------To check product existence----------------
    const titleExist = await ProductDetail.findOne({ _id: pID });
    if (!titleExist) {
      throw new Error("Product not Found !");
    }

    const res = await ProductDetail.findOneAndUpdate(
      { title },
      { ...productDetail }
    );

    // --------------To Update actudal produuct----------------
    const { Name, Product } = product;
    const productOBJ = {
      Name: Name,
      Product: Product,
      ProductDetail: res?._id,
    };
    const addProduct = await ProductActual.findOneAndUpdate(
      { ProductDetail: res?._id },
      { ...productOBJ }
    );

    return NextResponse.json(
      {
        data: Data,
        Product: addProduct,
        ProductDetail: res,
        message: "Updated Successfully",
        isSuccess: true,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json({
      data: null,
      error: error?.message,
      isSuccess: false,
    });
  }
});
