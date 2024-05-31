"use client";
import React, { useState } from "react";
import TextEditor from "./TextEditor";
import { UploadButton, UploadDropzone } from "../Utility/UploadThings";
import Pricing from "./Pricing";
import { toast } from "react-hot-toast";
import { useAppStore } from "@/Context/UseStoreContext";
import { useProduct } from "@/Context/UseProductContext";
const CreateProduct = () => {
  const { createProduct } = useProduct();
  const { userDetails } = useAppStore();
  const [loading, setloading] = useState(false);
  //Artical
  const [artical, setartical] = useState("");

  //Images
  const [thumbnail, setthumbnail] = useState("");
  const [images, setimages] = useState([]);
  const [userImages, setuserImages] = useState([]);
  // Pricing
  const [price, setprice] = useState(null);
  const [compareprice, setcompareprice] = useState(null);
  const [costPerItem, setcostPerItem] = useState(null);
  const [profit, setprofit] = useState(null);
  const [margin, setmargin] = useState(null);
  //Title
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [productURL, setproductURL] = useState("");

  //status
  const [status, setstatus] = useState("active");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      await createProduct({
        productDetail: {
          addeBy: userDetails?.User?._id,
          title,
          description,
          status: status,
          artical,
          images: images,
          thumbnail,
          userImages,
          pricing: {
            price,
            comAtPrice: compareprice,
            costPerItem,
            profit,
            margin,
          },
        },
        product: {
          Name: title,
          Product: productURL,
        },
      });
      setloading(false);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="flex-col flex gap-5">
      <div className="flex gap-5">
        <input
          type="text"
          placeholder="Title..."
          onChange={(e) => {
            settitle(e.target.value);
          }}
          className="w-full bg-secondary outline-none p-3"
        />
        <div className="gap-2 flex">
          <button
            onClick={() => {
              if (status === "draft") {
                setstatus("active");
              } else {
                setstatus("draft");
              }
            }}
            className="uil uil-pen flex items-center gap-2 bg-primaryColor p-2 px-5 rounded-full"
          >
            {status === "active" ? "Draft" : "active"}
          </button>
          <button
            onClick={handleSubmit}
            className="uil uil-pen flex items-center gap-2 bg-red p-2 px-5 rounded-full"
          >
            {loading ? "..." : "Save"}
          </button>
        </div>{" "}
      </div>

      <textarea
        type="text"
        name="description"
        onChange={(e) => {
          setdescription(e.target.value);
        }}
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
              console.log(res);
              setthumbnail(res[0]?.url);
              toast.success("Upload Completed");
            }}
            onUploadError={(error) => {
              toast.error(`ERROR! ${error.message}`);
            }}
          />
          <div className="w-full">
            <h2 className="font-semibold">Preview</h2>
            <h4 className=" text-gray-500 text-xs">
              {!thumbnail && "Thumbnail not uploaded"}
            </h4>

            {thumbnail && (
              <div className="p-5">
                <img src={thumbnail} alt={thumbnail} />
              </div>
            )}
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
              setimages((prev) => [...prev, res[0].url]);
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
                    <img src={item} />
                  </div>
                );
              })}
            </div>
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
              setuserImages((prev) => [...prev, res[0].url]);
              toast.success("Upload Completed");
            }}
            onUploadError={(error) => {
              toast.error(`ERROR! ${error.message}`);
            }}
          />
          <div className="w-full">
            <h2 className="font-semibold">Preview</h2>
            <h4 className=" text-gray-500 text-xs">
              {userImages?.length == 0 && "Thumbnail not uploaded"}
            </h4>
            <div className="grid  grid-cols-4 md:grid-cols-6">
              {userImages?.map((item, index) => {
                return (
                  <div className=" p-5" key={index}>
                    <img src={item} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-5  flex-col md:flex-row-reverse">
        <div className="flex gap-5  flex-col">
          <input
            type="text"
            onChange={(e) => {
              setproductURL(e.target.value);
            }}
            placeholder="Prodcut URL"
            className="w-full bg-secondary outline-none p-3"
          />
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
