import initDB from "@/helper/initDB";
import bcrypt from "bcrypt";
import User from "@/Modal/User";
import jwt from "jsonwebtoken";
initDB();
const saltRounds = 10;
import { NextResponse } from "next/server";
import Authentication from "@/Middleware/Authentication";
import RootAuth from "@/Middleware/RootAuth";

export async function POST(request) {
  try {
    const Data = await request.json();
    const { phoneNo, hash, OTP, userData, password, role } = Data;
    const checkOTP = await bcrypt.compare(OTP.toString(), hash);
    const userRole = await bcrypt.hash(role ? role : "user", saltRounds);
    const hashPassword = await bcrypt.hash(password, saltRounds);

    if (checkOTP) {
      const checkEmail = await User.findOne({ email: userData?.email });
      if (checkEmail) {
        throw new Error("Email Already Exists");
      }

      const userAdd = await User.create({
        image:
          userData.gender === "male"
            ? "/img/maleUser.svg"
            : "/img/femaleUser.svg",
        phoneNo,
        ...userData,
        role: userRole,
        password: hashPassword,
      });

      return NextResponse.json({
        isSuccess: true,
        userExist: false,
        message: "Register Success",
        token: genToken(userAdd?._id),
      });
    }

    throw new Error("Invalid OTP");
  } catch (error) {
    return NextResponse.json(
      {
        isSuccess: false,
        errorMsg: error.message,
      },
      {
        status: 404,
      }
    );
  }
}
export const PUT = Authentication(async (req, userid) => {
  try {
    const Data = await req.json();
    const { userData } = Data;

    const checkUser = await User.findByIdAndUpdate(userid, {
      ...userData,
      image:
        userData?.gender === "male"
          ? "/img/maleUser.svg"
          : "/img/femaleUser.svg",
    });
    if (checkUser) {
      return NextResponse.json({
        isSuccess: true,
        userExist: true,
        isUpdated: true,
        message: "User Updated",
      });
    }

    throw new Error("User Not Found");
  } catch (error) {
    return NextResponse.json(
      {
        isSuccess: false,
        isUpdated: false,
        errorMsg: error.message,
      },
      {
        status: 404,
      }
    );
  }
});

export const GET = RootAuth(async (request) => {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const page = searchParams.get("page"); // Retrieves the value of the 'page' parameter
    const limit = searchParams.get("limit"); // Retrieves the value of the 'limit' parameter
    const query = searchParams.get("query"); // Retrieves the value of the 'query' parameter  Ex : ?query={"_id":"649ec1dc0227a5b8da286425"}

    const skipCount = (page - 1) * limit;
    const usersCount = await User.countDocuments(); // Get the total count of blogs
    const totalPages = Math.ceil(usersCount / limit); // Calculate the total number of pages
    const users = await User.find(JSON.parse(query))
      .sort({ createdAt: -1 })
      .skip(skipCount)
      .limit(limit);

    return NextResponse.json({
      isSuccess: true,
      users,
      totalPages,
      usersCount,
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
});

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2160h" });
};
