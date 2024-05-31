import initDB from "@/helper/initDB";
initDB();

import { NextResponse } from "next/server";
import Subscribe from "@/Modal/Subscribe";

// --------------To Add Contact--------------
export const POST = async (request) => {
  try {
    const Data = await request.json();
    const { email } = Data;

    if (!email) {
      throw new Error("Fill all the Fields!");
    }

    const addSubscribe = await Subscribe.create({
      ...Data,
    });

    return NextResponse.json(
      {
        data: addSubscribe,
        message: "Subscribe Successfully",
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
};
