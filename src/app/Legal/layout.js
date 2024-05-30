import ResponsiveAppBar from "@/Components/Home/Utility/ResponsiveAppBar";
import React from "react";

const LegalLayout = ({ children }) => {
  return (
    <div className="container m-auto p-5">
      <ResponsiveAppBar shadow=" " position="fixed" />

      {children}
    </div>
  );
};

export default LegalLayout;
