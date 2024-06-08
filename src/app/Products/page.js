"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/Components/Home/Product/ProductCard";
import AllProductSkeleton from "@/Components/Skeleton/AllProductSkeleton";
import { ProductsURL } from "@/helper/allLinks";
import Spinner from "@/Components/Home/Utility/Spinner";

const AllProductComC = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(ProductsURL);
        const { products } = res.data;
        setProducts(products || []);
      } catch (err) {
        setError("Error occurred while fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className=" fixed left-0  h-screen w-full grid place-items-center bg-gray-950">
        <Spinner/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full grid place-items-center bg-gray-950">
        {error}
      </div>
    );
  }

  return (
    <div>
      {products.length === 0 ? (
        <div className="w-full text-center font-semibold">No Products Found</div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
          {products.map((item, index) => (
            <ProductCard
              key={index}
              description={item.description}
              thumbnail={item.thumbnail}
              title={item.title}
              price={item.pricing.price}
              comPrice={item.pricing.comAtPrice}
              views={item.views}
              id={item._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProductComC;
