"use client";
import Image from "next/image";
import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const ProductSlideShow = ({ images }) => {
  return (
    <div className="slide-container border-gray-700  mb-5 ">
      <Slide arrows={true}  duration={100}  indicators={false} infinite={true}>
        {images?.map((slideImage, index) => (
          <Image
            loading="lazy"
            src={slideImage}
            width={100}
            height={100}
            className="m-auto   w-full h-full "
            key={index}
            alt="images"
          />
        ))}
      </Slide>
    </div>
  );
};

export default ProductSlideShow;
