import ResponsiveAppBar from "@/Components/Home/Utility/ResponsiveAppBar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="bgPattern min-h-screen">
      <div className="container m-auto ">
        <ResponsiveAppBar shadow=" " position="fixed" />
        <main className="  ">{children}</main>
      </div>
    </div>
  );
};

export default layout;
