"use client";
import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const ProductSlideShow = ({ images }) => {
  return (
    <div className="slide-container border-gray-700  md:p-5 ">
      <Slide arrows={true} indicators={true} duration={1000}>
        {images?.map((slideImage, index) => (
          <img src={slideImage} className="m-auto md:w-[20%] w-full " key={index} alt="" />
        ))}
      </Slide>
    </div>
  );
};

export default ProductSlideShow;
