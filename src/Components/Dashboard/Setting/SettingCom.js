import React from "react";
import BasicCom from "./BasicCom";
import NavEdit from "./NavEdit";

const SettingCom = () => {
  return (
    <div>
      <BasicCom />
      <div className="h-[2px] my-5 bg-grayLight" />
      <NavEdit />
      <div className="h-[2px] my-5 bg-grayLight" />
    </div>
  );
};

export default SettingCom;
