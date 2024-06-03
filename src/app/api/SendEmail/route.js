import EmailTemp, { htmlString } from "@/Components/Home/Utility/EmailTem";
import initDB from "@/helper/initDB";
import Order from "@/Modal/Order";
import ProductModal from "@/Modal/Product";
import ProductDetail from "@/Modal/ProductDetail";
import { NextResponse } from "next/server";
import { Resend } from "resend";
initDB();

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (req) => {
  try {
    const today = new Date();
    const formattedDate = today.toLocaleDateString();

    const Details = await req.json();
    const { TID } = Details;

    const getOrder = await Order.findOne({
      TID,
    }).populate("Product");
    if (!getOrder) {
      throw new Error("Unauthorized");
    }

    if (!getOrder?.PayDetail?.code === "PAYMENT_SUCCESS") {
      throw new Error("You need to by product");
    }

    const getActualLink = await ProductModal.findOne({
      _id: getOrder?.Product?.productID,
    });

    if (!getActualLink) {
      throw new Error("Product Not Found");
    }
    const htmlData = `<!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fabcart</title>
        <style>
            body {
                background-color: #F6F6F6;
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
            }

            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
                margin: 0;
                padding: 0;
            }

            p {
                margin: 0;
                padding: 0;
            }

            .container {
                width: 100%;
                margin-right: auto;
                margin-left: auto;
                padding: 0 15px;
                box-sizing: border-box;
            }

            .brand-section {
                padding: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .company-details {
                text-align: right;
            }

            .body-section {
                padding: 16px;
                border: 1px solid gray;
                margin-bottom: 20px;
            }

            .heading {
                font-size: 20px;
                margin-bottom: 8px;
            }

            .sub-heading {
                margin-bottom: 5px;
            }

            table {
                background-color: #fff;
                width: 100%;
                border-collapse: collapse;
            }

            table thead tr {
                border: 1px solid #111;
                background-color: #f2f2f2;
            }

            table td {
                vertical-align: middle !important;
                text-align: center;
            }

            table th,
            table td {
                padding-top: 8px;
                padding-bottom: 8px;
            }

            .table-bordered {
                box-shadow: 0px 0px 5px 0.5px gray;
            }

            .table-bordered td,
            .table-bordered th {
                border: 1px solid #dee2e6;
            }

            .text-right {
                text-align: end;
            }

            .w-20 {
                width: 20%;
            }

            .float-right {
                float: right;
            }

            @media (max-width: 768px) {
                .brand-section {
                    flex-direction: column;
                    align-items: flex-start;
                }

                .company-details {
                    text-align: left;
                    margin-top: 10px;
                }

                .row {
                    flex-direction: column;
                }

                .col-6 {
                    width: 100%;
                    text-align: left;
                    margin-bottom: 20px;
                }

                .text-right {
                    text-align: left;
                }
            }
        </style>
    </head>

    <body style="background-color: white; color: black;margin-top: 10px;,">
        <div className="container">
            <div className="brand-section" style="color: white; background-color: blue; padding:"10px ">
                <div>
                    <h1 style="font-size: 20px;">WEALTH SUMMIT</h1>
                </div>
                <div className="company-details">
                    <p>wealthsummit@wealthsummit.shop</p>
                    <p>INDIA</p>
                </div>
            </div>

            <div className="body-section">
                <div className="row">
                    <div className=" col-6">
                        <h2 className="heading">INVOICE.:<span
                                style="font-size: 15px; font-weight: 400; ">${TID}</span> </h2>
                        <h3 style="margin-top: 5px; font-weight: 500; ">Order Date:<span
                                style="font-size: 15px; font-weight: 400; "> ${formattedDate}</span> </h3>
                        <h3 style="margin-top: 5px; font-weight: 500; ">Full Name: <span
                                style="font-size: 15px; font-weight: 400; ">${getOrder?.Name}</span> </h3>
                        <h3 style="margin-top: 5px; font-weight: 500; ">EMAIL:<span
                                style="font-size: 15px; font-weight: 400; ">${getOrder?.Email}</span> </h3>
                    </div>
                </div>

                <div className="body-section" style="margin-top: 10px;">
                    <h3 className="heading">Ordered Items</h3>
                    <br>
                    <h3 className="heading"></h3>
                    <div style="border:2px solid white; padding: 20px;">
                        <h4 style="margin-top: 5px;">${getOrder?.Product?.title}</h4>
                        <h5 style="margin-top: 5px;">Your Product: <a href=${getActualLink?.Product}>Download Now</a></h5>
                        <h5 style="margin-top: 5px;">Total Cost: <span
                                style="font-size: 15px; font-weight: 400; ">₹${getOrder?.Product?.pricing?.price}</span> </h5>
                    </div>
                    <br>
                    <h3 style="margin-top: 5px;">Payment Status: ${getOrder?.PayDetail?.code}</h3>
                    <h3 style="margin-top: 5px;">Payment Message: <span
                            style="font-size: 15px; font-weight: 400; ">${getOrder?.PayDetail?.message}</span> </h3>
                    <h3 style="margin-top: 5px;">Transaction ID: <span
                            style="font-size: 15px; font-weight: 400; ">${getOrder?.PayDetail?.data?.transactionId}</span> </h3>
                    <h3 style="margin-top: 5px;">Payment Mode: ${getOrder?.PayDetail?.data?.paymentInstrument?.type}</h3>
                </div>

                <div className="body-section">
                    <p>&copy; Copyright 2021 - Wealth Summit. All rights reserved.
                        <a href="https://www.wealthsummit.shop/">www.wealthsummit.shop</a>
                    </p>
                </div>
            </div>

    </body>

    </html>`;
    const { data, error } = await resend.emails.send({
      from: "wealthsummit@wealthsummit.shop",
      to: getOrder?.Email,
      subject: "Thanks you for buying " + getOrder?.Product?.title,
      html: htmlData,
    });

    if (error) {
      return NextResponse.json({ error });
    }
    return NextResponse.json({ getOrder });
  } catch (error) {
    return NextResponse.json(error.message);
  }
};
