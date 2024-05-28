"use client";
import React, { useState } from "react";
import TextEditor from "./TextEditor";
import { UploadButton, UploadDropzone } from "../Utility/UploadThings";
import Pricing from "./Pricing";
import { toast } from "react-hot-toast";
const CreateProduct = () => {
  const [artical, setartical] = useState("");
  const [files, setfiles] = useState([]);
  const [images, setimages] = useState([]);

  // Pricing
  const [price, setprice] = useState(null);
  const [compareprice, setcompareprice] = useState(null);
  const [costPerItem, setcostPerItem] = useState(null);
  const [profit, setprofit] = useState(null);
  const [margin, setmargin] = useState(null);
  return (
    <div className="flex-col flex gap-5">
      <div className="flex gap-5">
        <input
          type="text"
          placeholder="Title..."
          className="w-full bg-secondary outline-none p-3"
        />
        <div className="gap-2 flex">
          <button className="uil uil-pen flex items-center gap-2 bg-primaryColor p-2 px-5 rounded-full">
            Draft
          </button>
          <button className="uil uil-pen flex items-center gap-2 bg-red p-2 px-5 rounded-full">
            Publish
          </button>
        </div>{" "}
      </div>

      <textarea
        type="text"
        name="description"
        placeholder="Description"
        className="w-full bg-secondary outline-none p-3"
      />

      <div className="flex  flex-col md:flex-row    gap-5 ">
        <div className="flex  w-full md:w-[30%] bg-secondary p-5 gap-5">
          <UploadDropzone
            className="px-8 w-full rounded-none "
            appearance={{
              container:
                " outline-none md:w-96 w-full hover:cursor-pointer border-none bg-ground ",
              button: "bg-primaryColor  text-xs w-full mt-5",
              uploadIcon: "w-10 mt-2",
              label: "text-xs mt-5",
              allowedContent: "text-xs",
            }}
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setfiles(res);
              toast.success("Upload Completed");
            }}
            onUploadError={(error) => {
              toast.error(`ERROR! ${error.message}`);
            }}
          />
          <div className="w-full">
            <h2 className="font-semibold">Preview</h2>
            <h4 className=" text-gray-500 text-xs">
              {files?.length == 0 && "Thumbnail not uploaded"}
            </h4>
            {files.map((item, index) => {
              return (
                <div className="border p-5" key={index}>
                  <h4 className="text-xs">{item.name}</h4>
                  <img src={item?.url} alt={item.name} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex w-full bg-secondary p-5 gap-5">
          <UploadDropzone
            className="px-8 w-full rounded-none "
            appearance={{
              container:
                " outline-none md:w-96 w-full hover:cursor-pointer border-none bg-ground ",
              button: "bg-primaryColor  text-xs w-full mt-5",
              uploadIcon: "w-10 mt-2",
              label: "text-xs mt-5",
              allowedContent: "text-xs",
            }}
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setimages((prev) => [...prev, res[0]]);
              toast.success("Upload Completed");
            }}
            onUploadError={(error) => {
              toast.error(`ERROR! ${error.message}`);
            }}
          />
          <div className="w-full">
            <h2 className="font-semibold">Preview</h2>
            <h4 className=" text-gray-500 text-xs">
              {images?.length == 0 && "Thumbnail not uploaded"}
            </h4>
            <div className="grid  grid-cols-4 md:grid-cols-6">
              {images?.map((item, index) => {
                return (
                  <div className=" p-5" key={index}>
                    <h4 className="text-xs">{item?.name}</h4>
                    <img src={item?.url} alt={item?.name} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-5  flex-col md:flex-row-reverse">
        <div className="flex gap-5  flex-col">
          <Pricing
            setprice={setprice}
            setcompareprice={setcompareprice}
            setcostPerItem={setcostPerItem}
            setprofit={setprofit}
            setmargin={setmargin}
            margin={margin}
            profit={profit}
            price={price}
          />
        </div>

        <TextEditor artical={artical} height={500} setartical={setartical} />
      </div>
    </div>
  );
};

export default CreateProduct;
