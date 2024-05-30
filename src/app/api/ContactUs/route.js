import initDB from "@/helper/initDB";
initDB();

import { NextResponse } from "next/server";
import ContactUs from "@/Modal/ContactUs";

// --------------To Add Contact--------------
export const POST = async (request) => {
  try {
    const Data = await request.json();
    const { name, email, subject, message } = Data;

    if ((!name, !email, !subject, !message)) {
      throw new Error("Fill all the Fields!");
    }

    const addContact = await ContactUs.create({
      ...Data,
    });

    return NextResponse.json(
      {
        data: addContact,
        message: "Submit Successfully",
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
