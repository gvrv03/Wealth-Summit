import { Divider } from "@mui/material";
import React from "react";

const Pricing = ({
  setprice,
  setcompareprice,
  setcostPerItem,
  setprofit,
  setmargin,
  margin,
  profit,
  price
}) => {
  return (
    <div className="    bg-secondary p-5 text-white ">
      <label className="font-semibold ">
      <i className="uil font-bold pColor rounded-full mr-2  uil-university" />
        Pricing</label>
      <div className="flex mt-2 gap-5 flex-col md:flex-row">
        <div className="flex flex-col gap-2 text-sm text-gray-500">
          <label>Price</label>
          <div className=" rounded-md flex items-center   border border-gray-700 px-2">
            ₹
            <input
              onChange={(e) => {
                setprice(e.target.value);
              }}
              className="  bg-secondary border-gray-700 text-white w-full rounded-sm   px-2 py-2 outline-none"
              type="number"
              placeholder="0.00"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm text-gray-500">
          <label>Compare-at price</label>
          <div className=" flex items-center  border border-gray-700 rounded-md   px-2">
            ₹
            <input
              onChange={(e) => {
                setcompareprice(e.target.value);
              }}
              className=" rounded-sm  bg-secondary border-gray-700 text-white w-full px-2 py-2 outline-none"
              type="number"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row  flex-wrap gap-5">
        <div className="flex mt-5 flex-col gap-2 text-sm text-gray-500">
          <label>Cost per item</label>
          <div className=" flex items-center border border-gray-700  rounded-md  px-2">
            ₹
            <input
              onChange={(e) => {
                setcostPerItem(e.target.value);
                setprofit(price - e.target.value);
                setmargin(100 - (e.target.value / price) * 100);
              }}
              className="  bg-secondary border-gray-700 text-white w-full rounded-sm px-2 py-2 outline-none"
              type="number"
              placeholder="0.00"
            />
          </div>
        </div>
        <div className="flex mt-5 flex-col gap-2 text-sm text-gray-500">
          <label>Profit</label>
          <div className=" flex items-center  rounded-md  bg-grayLight   px-2 border border-gray-700">
            ₹
            <input
              value={profit}
              readOnly={true}
              className=" rounded-sm    bg-grayLight border-gray-700 text-black w-full  px-2 py-2 outline-none"
              type="number"
              placeholder="0.00"
            />
          </div>
        </div>
        <div className="flex mt-5 flex-col gap-2 text-sm text-gray-500">
          <label>Margin</label>
          <div className=" flex items-center  rounded-md  bg-grayLight   px-2 border border-gray-700">
            <input
              value={margin}
              readOnly={true}
              className=" rounded-sm   bg-grayLight  border-gray-700 text-black w-full  px-2 py-2 outline-none"
              type="number"
              placeholder="0.00"
            />
            %
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
