import ResponsiveAppBar from "@/Components/Home/Utility/ResponsiveAppBar";
import React from "react";

const ContactLayout = ({ children }) => {
  return (
    <div className="bgPattern">
      <div className=" container  m-auto text-white body-font">
        <ResponsiveAppBar shadow=" " position="fixed" />
        {children}
      </div>
    </div>
  );
};

export default ContactLayout;
