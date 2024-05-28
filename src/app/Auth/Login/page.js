import LoginCom from "@/Components/Home/Auth/LoginCom";
import React from "react";

const page = () => {
  return (
    <div>
      {/* <h2 className="px-10 py-5 font-semibold text-lg uil md:hidden uil-user flex gap-5 items-center text-white w-full bg-primaryColor rounded-b-3xl ">
        Sign In
      </h2> */}
      <LoginCom />
    </div>
  );
};

export default page;
