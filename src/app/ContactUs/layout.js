import ResponsiveAppBar from "@/Components/Home/Utility/ResponsiveAppBar";
import React from "react";

const ContactLayout = ({ children }) => {
  return (
  <div className="bgPattern" >
      <div className="container  m-auto p-5">
      <ResponsiveAppBar shadow=" " position="fixed" />

      {children}
    </div>
  </div>
  );
};

export default ContactLayout;
