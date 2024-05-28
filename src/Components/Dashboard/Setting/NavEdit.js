"use client";
import React, { useState } from "react";
import { DashNav } from "@/Sample Data/Nav";
import Link from "next/link";
import { toast } from "react-hot-toast";

const NavEdit = () => {
  const [navItems, setNavItems] = useState(DashNav);

  const [newItemName, setNewItemName] = useState("");
  const [newItemLocation, setNewItemLocation] = useState("");
  const [newItemIcon, setNewItemIcon] = useState("");

  const handleAddItem = () => {
    if (!newItemName || !newItemLocation || !newItemIcon) {
        return toast.error("Fill all the fields")
    }

    const newItem = {
      name: newItemName,
      location: newItemLocation,
      icon: newItemIcon,
    };
    toast.success("Added");
    setNavItems([...navItems, newItem]);
    setNewItemName("");
    setNewItemLocation("");
    setNewItemIcon("");
  };

  const handleDeleteItem = (index) => {
    const updatedNavItems = [...navItems];
    updatedNavItems.splice(index, 1);
    setNavItems(updatedNavItems);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <h2 className="font-semibold md:text-lg text-base">NavItems</h2>
        <button
          onClick={handleAddItem}
          className="border ml-2 px-5 text-xs rounded-md py-1 "
        >
          Add Item
        </button>
      </div>

      <div className="flex gap-5 md:flex-row flex-col">
        <div>
          <h3 className="md:text-base font-medium text-gray-600 text-sm">
            Name
          </h3>
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="border rounded-md w-full md:w-auto md:text-base text-sm text-gray-600 outline-none p-2 mt-2"
          />
        </div>

        <div>
          <h3 className="md:text-base font-medium text-gray-600 text-sm">
            Location
          </h3>
          <input
            type="text"
            value={newItemLocation}
            onChange={(e) => setNewItemLocation(e.target.value)}
            className="border rounded-md w-full md:w-auto md:text-base text-sm text-gray-600 outline-none p-2 mt-2"
          />
        </div>

        <div>
          <h3 className="md:text-base font-medium text-gray-600 text-sm">
            Unicon CSS{" "}
            <Link
              target="_blank"
              href="https://iconscout.com/unicons/free-line-icons"
              className="italic text-[10px] text-blue-600 ml-2"
            >
              learn More <span className="uil uil-arrow-right" />{" "}
            </Link>
          </h3>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newItemIcon}
              onChange={(e) => setNewItemIcon(e.target.value)}
              className="border rounded-md w-full md:w-auto md:text-base text-sm text-gray-600 outline-none p-2 mt-2"
            />
            <p
              className={`uil ${newItemIcon} text-xl rounded-md  px-2 border-blue-950 py-1 `}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="md:text-base font-medium text-gray-600 text-sm">
          Preview
        </h3>
        {navItems.length <= 0 && (
          <div className="text-xs mt-2 ">No Nav Item found</div>
        )}
        <div className="grid gap-2 mt-2 grid-cols-3 md:grid-cols-10">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="relative text-xs p-2 justify-between items-center flex gap-2 bg-gray-50  "
            >
              <div className="flex gap-2">
                <span className={item.icon} />
                <p>{item.name}</p>
              </div>
              <button
                onClick={() => handleDeleteItem(index)}
                className="uil uil-multiply p-1"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavEdit;
