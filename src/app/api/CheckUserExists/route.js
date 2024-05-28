import initDB from "@/helper/initDB";
import bcrypt from "bcrypt";
import User from "@/Modal/User";
import jwt from "jsonwebtoken";
initDB();

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const Data = await request.json();
    const { phoneNo, email } = Data;

    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      throw new Error("Email Already Exists");
    }
    const checkphoneNo = await User.findOne({ phoneNo });
    if (checkphoneNo) {
      throw new Error("Phone No. Already Exists");
    }

    return NextResponse.json(
      {
        isSuccess: true,
        isUnique: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        isSuccess: false,
        isUnique: false,
        errorMsg: error.message,
      },
      {
        status: 404,
      }
    );
  }
}
