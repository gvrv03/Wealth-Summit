import EmailTemp, { htmlString } from "@/Components/Home/Utility/EmailTem";
import Order from "@/Modal/Order";
import Product from "@/Modal/Product";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (req) => {
  try {
    const today = new Date();
    const formattedDate = today.toLocaleDateString();

    const Details = await req.json();
    const { userEmails, subject, ProductDetail } = Details;

    const checkPay = await Order.findOne({
      razorpay_order_id: ProductDetail?.orderID,
    });
    console.log(checkPay);
    if (!checkPay) {
      throw new Error("Unauthorized");
    }

    const getActualLink = await Product.findOne({
      _id: ProductDetail?.produDID,
    });
    console.log(getActualLink);
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
    
    <body style="background-color: white; color: black;margin-top: 10px; ">
        <div class="container">
            <div class="brand-section" style="color: white; background-color: blue;">
                <div>
                    <h1 style="font-size: 20px;">WEALTH SUMMIT</h1>
                </div>
                <div class="company-details">
                    <p>wealthsummit@wealthsummit.shop</p>
                    <p>INDIA</p>
                </div>
            </div>
    
            <div class="body-section">
                <div class="row">
                    <div class=" col-6">
                        <h2 class="heading">Invoice No.:<span
                                style="font-size: 15px; font-weight: 400; ">${ProductDetail?.invoice}</span> </h2>
                        <h3 style="margin-top: 5px; font-weight: 500; ">Order Date:<span
                                style="font-size: 15px; font-weight: 400; "> ${formattedDate}</span> </h3>
                        <h3 style="margin-top: 5px; font-weight: 500; ">Full Name: <span
                                style="font-size: 15px; font-weight: 400; ">${ProductDetail?.name}</span> </h3>
                        <h3 style="margin-top: 5px; font-weight: 500; ">EMAIL:<span
                                style="font-size: 15px; font-weight: 400; ">${ProductDetail?.email}</span> </h3>
                    </div>
                </div>
    
                <div class="body-section" style="margin-top: 10px;">
                    <h3 class="heading">Ordered Items</h3>
                    <br>
                    <h3 class="heading"></h3>
                    <div style="border:2px solid white; padding: 20px;">
                        <h4 style="margin-top: 5px;">${ProductDetail?.title}</h4>
                        <h5 style="margin-top: 5px;">Your Product: <a href=${getActualLink?.Product}>Download Now</a></h5>
                        <h5 style="margin-top: 5px;">Total Cost: <span
                                style="font-size: 15px; font-weight: 400; ">₹${ProductDetail?.amount}</span> </h5>
                    </div>
                    <br>
                    <h3 style="margin-top: 5px;">Payment Status: Paid </h3>
                    <h3 style="margin-top: 5px;">Payment ID: <span
                            style="font-size: 15px; font-weight: 400; ">${ProductDetail?.payID}</span> </h3>
                    <h3 style="margin-top: 5px;">Order ID: <span
                            style="font-size: 15px; font-weight: 400; ">${ProductDetail?.orderID}</span> </h3>
                    <h3 style="margin-top: 5px;">Payment Mode: Razorpay </h3>
                </div>
    
                <div class="body-section">
                    <p>&copy; Copyright 2021 - Wealth Summit. All rights reserved.
                        <a href="https://www.wealthsummit.shop/">www.wealthsummit.shop</a>
                    </p>
                </div>
            </div>
    
    </body>
    
    </html>`;

    const { data, error } = await resend.emails.send({
      // from: "itsgaurav3112003@gmail.com",
      // to: userEmails,
      from: "wealthsummit@wealthsummit.shop",
      to: userEmails,
      subject: subject,
      html: htmlData,
    });

    if (error) {
      return NextResponse.json({ error });
    }

    return NextResponse.json({ Data: htmlData });
  } catch (error) {
    return NextResponse.json(error);
  }
};
