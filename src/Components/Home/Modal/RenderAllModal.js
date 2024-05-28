"use client";
import { UseDashboardContextProvider } from "@/Context/UseDashboardContext";
import { useAppStore } from "@/Context/UseStoreContext";
import React from "react";
import SignOutModal from "./SignOutModal";
import UpdateRoleModal from "./UpdateRoleModal";

const RenderAllModal = () => {
  const { signOutIsOpen, setsignOutIsOpen, isUpdateModal, setisUpdateModal } =
    useAppStore();
  return (
    <>
      <UseDashboardContextProvider>
        <SignOutModal state={signOutIsOpen} setState={setsignOutIsOpen} />
        <UpdateRoleModal state={isUpdateModal} setState={setisUpdateModal} />
      </UseDashboardContextProvider>
    </>
  );
};

export default RenderAllModal;
