import { Fast2SMSSend } from "@/API/Authentication/Auth";
import initDB from "@/helper/initDB";
import User from "@/Modal/User";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { Random } from "random-js";

initDB();
const saltRounds = 10;

export async function POST(request) {
  try {
    const Data = await request.json();
    const { phoneNo } = Data;

    const random = new Random();
    const OTP = random.integer(100000, 999999);

    const userExist = await User.findOne({ phoneNo });
    const hashedOTP = await bcrypt.hash(OTP.toString(), saltRounds);
    const result = await Fast2SMSSend(phoneNo, OTP.toString());
    console.log("OTP is: ", OTP);
    console.log("hash OTP :" + hashedOTP);
    if (result.return) {
      return NextResponse.json({
        userExist: userExist ? true : false,
        hash: hashedOTP,
        isSuccess: true,
        message: result.message[0],
      });
    }
    return NextResponse.json({
      isSuccess: false,
      message: result.message,
    });
    
  } catch (error) {
    return NextResponse.json(
      {
        isSuccess: false,
        error: "Internal Server Error",
        errorMsg: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export const GET = async (request) => {
  try {
    const allUser = await User.find();
    return NextResponse.json(allUser);
  } catch (error) {
    return NextResponse.json(
      { msg: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
};
