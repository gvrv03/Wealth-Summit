import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const Authentication = (handler) => async (req, res) => {
  try {
    const authorization = req.headers.get("Authorization");
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new Error("Token Missing, Login again");
    }
    const token = authorization.split("Bearer ")[1];
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken) {
      return handler(req, decodedToken?.id);
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

export default Authentication;
