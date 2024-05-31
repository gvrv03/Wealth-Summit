"use client";
import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const ProductSlideShow = ({ images }) => {
  return (
    <div className="slide-container border-gray-700  mb-5 ">
      <Slide arrows={false} indicators={false} infinite={false}>
        {images?.map((slideImage, index) => (
          <img
            src={slideImage}
            className="m-auto  w-full  h-full "
            key={index}
            alt="images"
          />
        ))}
      </Slide>
    </div>
  );
};

export default ProductSlideShow;
