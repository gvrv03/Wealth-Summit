import initDB from "@/helper/initDB";
import bcrypt from "bcrypt";
import User from "@/Modal/User";
import jwt from "jsonwebtoken";
initDB();
import { NextResponse } from "next/server";
export async function POST(request) {
  try {
    const Data = await request.json();
    const { email, password } = Data;

    const findUser = await User.findOne({ email });

    if (!findUser) {
      throw new Error("User not Found");
    }
    const checkPassword = await bcrypt.compare(password, findUser.password);

    if (checkPassword) {
      return NextResponse.json({
        isSuccess: true,
        userExist: true,
        message: "Login Success",
        token: genToken(findUser?._id),
      });
    }
    throw new Error("Invalid Credentials");
  } catch (error) {
    return NextResponse.json(
      {
        isSuccess: false,
        errorMsg: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2160h" });
};
