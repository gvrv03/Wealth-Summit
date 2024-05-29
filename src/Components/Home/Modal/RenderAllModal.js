"use client";
import { UseDashboardContextProvider } from "@/Context/UseDashboardContext";
import { useAppStore } from "@/Context/UseStoreContext";
import React from "react";
import BuyingModal from "./BuyingModal";
import SignOutModal from "./SignOutModal";
import UpdateRoleModal from "./UpdateRoleModal";

const RenderAllModal = () => {
  const { signOutIsOpen, setsignOutIsOpen, isUpdateModal, setisUpdateModal,isBuyingOpen, setisBuyingOpen } =
    useAppStore();
  return (
    <>
      <UseDashboardContextProvider>
        <SignOutModal state={signOutIsOpen} setState={setsignOutIsOpen} />
        <UpdateRoleModal state={isUpdateModal} setState={setisUpdateModal} />
        <BuyingModal  state={isBuyingOpen} setState={setisBuyingOpen}  />
      </UseDashboardContextProvider>
    </>
  );
};

export default RenderAllModal;
