"use client";
import { useDashboard } from "@/Context/UseDashboardContext";
import { useAppStore } from "@/Context/UseStoreContext";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const ReturnRole = ({ id }) => {
  const [userRole, setuserRole] = useState({});
  const { getUserRoles, updateUserRole } = useDashboard();
  useEffect(() => {
    getUserRoles(id, setuserRole);
  }, []);

  return (
    <>
      <select
        onChange={(e) => {
          updateUserRole(id, e.target.value);
        }}
        value={userRole?.isRoot ? "Root" : userRole?.isAdmin ? "Admin" : "User"}
        className=" outline-none flex gap-2  bg-secondary px-3 py-1  text-xs rounded-full "
      >
        <option className="rounded-none " value="Root">
          Root
        </option>
        <option className="rounded-none " value="Admin">
          Admin
        </option>
        <option className="rounded-none " value="User">
          User
        </option>
      </select>
    </>
  );
};

export default ReturnRole;
