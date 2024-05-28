"use client";
import { useUserAuth } from "@/Context/UserAuthContext";
import { useAppStore } from "@/Context/UseStoreContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { DefaultBTN } from "../../Utility/Utility";

const ProfileComp = () => {
  const [disablePersonal, setdisablePersonal] = useState(true);
  const [loading, setloading] = useState(false);
  const [disable, setdisable] = useState(true);
  const router = useRouter();
  const { updateUserDetail } = useUserAuth();
  const { userDetails } = useAppStore();


  
  const [userData, setuserData] = useState(userDetails?.User);
  function onChange(e) {
    setuserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setloading(true);
    await updateUserDetail(userData);
    setloading(false);
  };

  return (
    <div className="flex flex-col ">
      <button
        onClick={() => {
          router.push("/MyAccount");
        }}
        className="flex items-center   text-black   p-5 py-2    gap-2 justify-start"
      >
        <i className="uil uil-angle-left-b -ml-5 text-2xl" />
        <h2 className="font-semibold">Edit Profile</h2>
      </button>
      <div className="     ">
        <div className="flex gap-2 items-center ">
          <AccountCardHeader
            styleCus="font-semibold text-base"
            name="Personal Information"
          />
          <button
            onClick={() => {
              if (disablePersonal) {
                setdisablePersonal(false);
              } else {
                setdisablePersonal(true);
              }
            }}
            className="text-blue-900 font-semibold text-xs "
          >
            Edit
          </button>
        </div>
        <div className="mt-2 flex  flex-col md:flex-row w-full  items-center gap-5 ">
          <div className=" md:mr-5  h-full   grid place-items-center  ">
            <div className="relative">
              <img
                src={userDetails?.User?.image}
                alt={userData?.name}
                className="w-20"
              />
            </div>
          </div>
          <div className="flex-col flex  md:w-auto w-full  gap-2">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full  gap-2">
              <div className="gap-2 flex  border       items-center    p-2 ">
                <i className="uil uil-user pColor text-lg " />
                <input
                  disabled={disablePersonal}
                  type="text"
                  value={userData?.name}
                  onChange={onChange}
                  name="name"
                  className="px-2 disabled: bg-transparent  disabled:text-gray-500  outline-none w-full "
                />
              </div>
              <div className="gap-2 flex  border  items-center     p-2 ">
                <i className="uil uil-calender pColor text-lg " />
                <input
                  type="date"
                  disabled={disablePersonal}
                  value={userData?.dob}
                  onChange={onChange}
                  name="dob"
                  className="px-2 disabled: bg-transparent  disabled:text-gray-500  outline-none w-full "
                />
              </div>
              <div className="gap-2 flex  border  items-center    p-2 ">
                <i className="uil uil-venus pColor text-lg " />

                <select
                  disabled={disablePersonal}
                  value={userData?.gender}
                  onChange={onChange}
                  name="gender"
                  className="px-2 disabled: bg-transparent   disabled:text-gray-500  outline-none w-full "
                >
                  <option value="male" className="">
                    Male
                  </option>
                  <option value="female" className="">
                    Female
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!disablePersonal && (
        <div className="   flex flex-col mt-5 gap-2">
          <DefaultBTN
            name="Save"
            clickHandle={handleUpdateUser}
            loading={loading}
            styleCSS=" md:px-10 md:w-fit"
          />
        </div>
      )}{" "}
      <div className=" ">
        <AccountCardHeader
          styleCus="font-semibold text-base"
          name="Contact Information"
        />
        <div className="mt-2 flex  w-full  items-center gap-5 ">
          <div className="flex-col flex  md:w-auto w-full gap-2">
            <div className="grid grid-cols-1 md:grid-cols-2   w-full  gap-2">
              <div className="gap-2 flex   w-full border      items-center    p-2 ">
                <i className="uil uil-envelope pColor text-lg " />
                <input
                  disabled={disable}
                  type="email"
                  value={userData?.email}
                  className="px-2 disabled: bg-transparent  disabled:text-gray-500  outline-none w-full "
                />
              </div>
              <div className="gap-2 flex w-full   border    items-center    p-2 ">
                <i className="uil uil-phone pColor text-lg " />
                <input
                  type="number"
                  disabled={disable}
                  value={userData?.phoneNo}
                  className="px-2 disabled: bg-transparent  disabled:text-gray-500  outline-none w-full "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="   flex flex-col gap-2 ">
        <AccountCardHeader styleCus="font-semibold text-base" name="FAQs" />

        <div className="flex-col text-gray-700 text-justify gap-2 flex justify-between">
          <div>
            <label className="font-semibold mb-1">
              What happens when I update my email address (or mobile number)?
            </label>
            <p>
              Your login email id (or mobile number) changes, likewise. You will
              receive all your account related communication on your updated
              email address (or mobile number).
            </p>
          </div>

          <div>
            <label className="font-semibold mb-1">
              When will my account be updated with the new email address (or
              mobile number)?
            </label>
            <p>
              It happens as soon as you confirm the verification code sent to
              your email (or mobile) and save the changes.
            </p>
          </div>
          <div>
            <label className="font-semibold mb-1">
              What happens to my existing account when I update my email address
              (or mobile number)?
            </label>
            <p>
              Updating your email address (or mobile number) does not invalidate
              your account. Your account remains fully functional. You will
              continue seeing your Order history, saved information and personal
              details.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full pt-5  bottom-0 fixed left-0 right-0">
        <img
          className="w-full "
          src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/myProfileFooter_4e9fe2.png"
          alt=""
        />
      </div>
    </div>
  );
};

export const AccountCardHeader = ({ name, styleCus }) => {
  return (
    <div className="flex justify-between mt-5   text-gray-700">
      <h2 className={`${styleCus}`}>{name}</h2>
    </div>
  );
};
export default ProfileComp;
