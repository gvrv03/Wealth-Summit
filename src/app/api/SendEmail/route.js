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
    const htmlData = `
<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fabcart</title>
        <style>
            body{
                background-color: #F6F6F6; 
                margin: 0;
                padding: 0;
            } 

            h1,h2,h3,h4,h5,h6{
                margin: 0;
                padding: 0;
            }
            
            p{
                margin: 0;
                padding: 0;
            }
            
            .container{
                width: 100%;
                margin-right: auto;
                margin-left: auto;
            }
            .brand-section{
            background-color: #0d1033;
            padding: 10px 40px;
            }
            .logo{
                width: 50%;
            }

            .row{
                display: flex;
                flex-wrap: wrap;
            }
            .col-6{
                width: 50%;
                flex: 0 0 auto;
            }
            .text-white{
                color: #fff;
            }
            .company-details{
                float: right;
                text-align: right;
            }
            .body-section{
                padding: 16px;
                border: 1px solid gray;
            }
            .heading{
                font-size: 20px;
                margin-bottom: 08px;
            }
            .sub-heading{
                color: #262626;
                margin-bottom: 05px;
            }
            table{
                background-color: #fff;
                width: 100%;
                border-collapse: collapse;
            }
            table thead tr{
                border: 1px solid #111;
                background-color: #f2f2f2;
            }
            table td {
                vertical-align: middle !important;
                text-align: center;
            }
            table th, table td {
                padding-top: 08px;
                padding-bottom: 08px;
            }
            .table-bordered{
                box-shadow: 0px 0px 5px 0.5px gray;
            }
            .table-bordered td, .table-bordered th {
                border: 1px solid #dee2e6;
            }
            .text-right{
                text-align: end;
            }
            .w-20{
                width: 20%;
            }
            .float-right{
                float: right;
            }
        </style>
    </head>
    <body>

        <div class="container">
            <div class="brand-section">
                <div class="row">
                    <div class="col-6">
                        <h1 class="text-white">WEALTH SUMMIT</h1>
                    </div>
                    <div class="col-6">
                        <div class="company-details">
                        <p class="text-white"> wealthsummit@wealthsummit.shop</p>
                        <p class="text-white">INDIA</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="body-section">
                <div class="row">
                    <div class="col-6">
                        <h2 class="heading">Invoice No.: ${ProductDetail?.invoice} </h2>
                        <p class="sub-heading">Order Date: ${formattedDate}</p>
                    </div>
                    <div class="col-6">
                        <p class="sub-heading">Full Name: ${ProductDetail?.name}</p>
                        <p class="sub-heading">EMAIL:  ${ProductDetail?.email}</p>
                    </div>
                </div>
            </div>

            <div class="body-section">
                <h3 class="heading">Ordered Items</h3>
                <br>

                <h3 class="heading"> ${ProductDetail?.title}</h3>
                <h4> Your Product : <a href=${getActualLink?.Product} >Download Now</a>
                </h4>
                <br>
                <h4 >Total Cost : ${ProductDetail?.amount}</h4>
                
                <br>
                <h3 >Payment Status: Paid</h3>
                <h3 >Payment ID : ${ProductDetail?.payID}</h3>
                <h3 >Order ID : ${ProductDetail?.orderID}</h3>
                <h3 >Payment Mode: Razorpay</h3>
            </div>

            <div class="body-section">
                <p>&copy; Copyright 2021 - Wealth Summit. All rights reserved. 
                    <a href="https://www.wealthsummit.shop/" class="float-right">www.wealthsummit.shop</a>
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
