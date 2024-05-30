"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFoundProduct() {
  const router = useRouter();
  return (
    <div className="flex  items-center h-[70vh] justify-center w-full">
      <div className="text-center">
        <div className="inline-flex rounded-full bg-yellow-100 p-4">
          <div className="rounded-full stroke-yellow-600 bg-yellow-200 p-4">
            <svg
              className="w-16 h-16"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
        </div>
        <h1 className="mt-5 text-[36px] font-bold text-white lg:text-[50px]">
          404 &#45; Product not found
        </h1>
        <p className="text-gray-400 mt-5 lg:text-lg">
          The page you are looking for doesn&#39;t exist or <br />
          has been removed&#46;
        </p>
        <button
          className="bg-primaryColor p-2 rounded-md px-10 py-2 mt-5"
          onClick={() => {
            router.push("/Products");
          }}
        >
          Visit Products
        </button>
      </div>
    </div>
  );
}
