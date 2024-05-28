import RootAuth from "@/Middleware/RootAuth";
import User from "@/Modal/User";
import bcrypt from "bcrypt";

import { NextResponse } from "next/server";
const saltRounds = 10;
export const POST = RootAuth(async (req, id) => {
  try {
    const { roleID, roleName } = await req.json();
    if (!roleName || !roleID) {
      throw new Error("Inavalid Request !");
    }

    const isOwn = await User.findOne({ role: roleID, _id: id });

    if (isOwn) {
      throw new Error("Access Denied !");
    }

    const newUserRole = await bcrypt.hash(
      roleName === "Admin"
        ? process.env.ADMIN_KEY
        : roleName === "Root"
        ? process.env.ROOT_KEY
        : "user",
      saltRounds
    );
    const changeRole = await User.findOneAndUpdate(
      { role: roleID },
      { role: newUserRole }
    );

    if (!changeRole) {
      throw new Error("Not Found");
    }
    return NextResponse.json({
      isSuccess: true,
      message: "User Updated!",
    });
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
});

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const id = searchParams.get("id");

    const hashRootRole = await bcrypt.compare(process.env.ROOT_KEY, id);
    const hashAdminRole = await bcrypt.compare(process.env.ADMIN_KEY, id);

    return NextResponse.json(
      {
        isSuccess: true,
        isAdmin: hashAdminRole,
        isRoot: hashRootRole,
        isUser: !hashAdminRole && !hashRootRole ? true : false,
      },
      {
        status: 200,
      }
    );
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
