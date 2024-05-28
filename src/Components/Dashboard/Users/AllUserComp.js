"use client";
import { useUserAuth } from "@/Context/UserAuthContext";
import React, { useEffect, useState } from "react";
import { useAppStore } from "@/Context/UseStoreContext";
import MaintableCom from "../Utility/MainTableCom";
import HeaderStatBar from "../Utility/HeaderStatBar";
import { toast } from "react-hot-toast";
import Pegination from "../Utility/Pegination";

const GetUsers = () => {
  const { refresh } = useAppStore();
  const { fetchUsersAll, usersAll } = useUserAuth();
  const [colData, setcolData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [userID, setuserID] = useState("");

  useEffect(() => {
    fetchUsersAll({
      page: page,
      limit: limit,
    });
  }, [page, limit, refresh]);

  const { data, isLoading, count, totalPages } = usersAll ? usersAll : {};
  if (data?.length > 0) {
    if (colData.length === 0) {
      setcolData(Object.keys(data[0]));
    }
  }
  return (
    <div className="flex-col flex   ">
      <HeaderStatBar
        limit={limit}
        setLimit={setLimit}
        noOfData={data?.length}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        create="/Dashboard/Blogs/CreateBlog"
      />

      <div className="w-[92vw] md:w-auto  ">
        <MaintableCom
          data={data}
          isLoading={isLoading}
          colData={colData}
          itemID={userID}
          count={count}
          setItemID={setuserID}
        />
      </div>

      <Pegination
        page={page}
        setPage={setPage}
        noOfData={data?.length}
        totalPages={totalPages}
      />
    </div>
  );
};

export default GetUsers;
