import initDB from "@/helper/initDB";
import ProductDetailData from "@/Modal/ProductDetail";
import ProductActual from "@/Modal/Product";
initDB();

import { NextResponse } from "next/server";
import RootAuth from "@/Middleware/RootAuth";

// --------------To Add Product--------------
export const POST = RootAuth(async (request) => {
  try {
    const Data = await request.json();
    const { productDetail, product } = Data;
    const { addeBy, title, description, artical, images, thumbnail, status } =
      productDetail;
    if (
      !addeBy ||
      !title ||
      !description ||
      !artical ||
      !images ||
      !thumbnail ||
      !status
    ) {
      throw new Error("Fill all the Fields!");
    }
    // --------------To check product existence----------------
    const titleExist = await ProductDetailData.findOne({ title });
    if (titleExist) {
      await ProductDetailData.findOneAndUpdate({ title }, { ...productDetail });

      return NextResponse.json(
        {
          data: null,
          message: "Already Exits, Then Updated",
          isSuccess: true,
        },
        {
          status: 200,
        }
      );
    }

    // --------------To Add produuct Detail----------------
    const addProductDetail = await ProductDetailData.create({
      ...productDetail,
    });

    // --------------To Add actudal produuct----------------
    const { Name, Product } = product;
    const productOBJ = {
      Name: Name,
      Product: Product,
      ProductDetail: addProductDetail._id,
    };
    const addProduct = await ProductActual.create({ ...productOBJ });

    // --------------To Update productID in productDetail ----------------
    const UpdateProductID = await ProductDetailData.findByIdAndUpdate(
      addProductDetail._id,
      { productID: addProduct._id }
    );

    return NextResponse.json(
      {
        data: Data,
        Product: addProduct,
        ProductDetail: UpdateProductID,
        message: "Product Added Successfully",
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
        error: error?.message,
        isSuccess: false,
      }
    );
  }
});

// --------------To Fetch All Products--------------
export const GET = async (request) => {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const page = searchParams.get("page"); // Retrieves the value of the 'page' parameter
    const limit = searchParams.get("limit"); // Retrieves the value of the 'limit' parameter
    const query = searchParams.get("query"); // Retrieves the value of the 'query' parameter  Ex : ?query={"_id":"649ec1dc0227a5b8da286425"}

    const skipCount = (page - 1) * limit;
    const ProductCount = await ProductDetailData.countDocuments(); // Get the total count of blogs
    const totalPages = Math.ceil(ProductCount / limit); // Calculate the total number of pages

    const products = await ProductDetailData.find(JSON.parse(query))
      .sort({ createdAt: -1 })
      .skip(skipCount)
      .limit(limit);

    return NextResponse.json({ products, totalPages, ProductCount });
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
