import User from "@/Modal/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const RootAuth = (handler) => async (req, res) => {
  try {
    const authorization = req.headers.get("Authorization");
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new Error("Token Missing, Login again");
    }
    const token = authorization.split("Bearer ")[1];
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken) {
      const getUser = await User.findById(decodedToken?.id);
      if (getUser) {
        const hashRootRole = await bcrypt.compare(
          process.env.ROOT_KEY,
          getUser?.role
        );

        if (hashRootRole) {
          return handler(req, decodedToken?.id);
        }
        throw new Error("Access Denied");
      }
      throw new Error("User Not Found");
    }
    throw new Error("You need to Login !");
  } catch (error) {
    return NextResponse.json(
      {
        isLogin: false,
        errorMsg: error.message,
        isSuccess: false,
      },
      {
        status: 401,
      }
    );
  }
};

export default RootAuth;
