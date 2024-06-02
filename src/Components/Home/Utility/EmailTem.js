export const htmlString = `
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
            width: 80%;
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

    <div className="container">
        <div className="brand-section">
            <div className="row">
                <div className="col-6">
                    <h1 className="text-white">WEALTH SUMMIT</h1>
                </div>
                <div className="col-6">
                    <div className="company-details">
                        <p className="text-white">At, Yavatmal Dist. Maharashtra, INDIA</p>
                        <p className="text-white"> wealthsummit@wealthsummit.shop</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="body-section">
            <div className="row">
                <div className="col-6">
                    <h2 className="heading">Invoice No.: INVOICEID</h2>
                    <p className="sub-heading">Order Date: ORDERDATE</p>
                </div>
                <div className="col-6">
                    <p className="sub-heading">Full Name: CUSTOMERNAME</p>
                    <p className="sub-heading">EMAIL:  CUSTOMEREMAIL</p>
                </div>
            </div>
        </div>

        <div className="body-section">
            <h3 className="heading">Ordered Items</h3>
            <br>
            
            <h3 className="heading"> PRODUCTNAME</h3>
                
                <br>
                <h4 >Total Cost : TOTALCOST</h4>

            <br>
            <h3 >Payment Status: Paid</h3>
            <h3 >Payment ID : PAYMENTID</h3>
            <h3 >Order ID : ORDERID</h3>
            <h3 >Payment Mode: Razorpay</h3>
        </div>

        <div className="body-section">
            <p>&copy; Copyright 2021 - Wealth Summit. All rights reserved. 
                <a href="https://www.wealthsummit.shop/" className="float-right">www.wealthsummit.shop</a>
            </p>
        </div>      
    </div>      

</body>
</html>
`;
