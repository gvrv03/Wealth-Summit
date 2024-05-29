import { NextResponse } from "next/server";
import { Resend } from "resend";
const resend = new Resend("re_GvsnCJ3B_GajgupNFmLFLqnD5SfF6qwsm");

export const POST = async (req) => {
  try {
    const Details = await req.json();
    const { userEmails, subject, emailData } = Details;

    const { data, error } = await resend.emails.send({
      from: "itsgaurav3112003@gmail.com",
      to: userEmails,
      subject: subject,
      html: emailData,
    });
    if (error) {
      return NextResponse.json({ error });
    }
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(error);
  }
};
