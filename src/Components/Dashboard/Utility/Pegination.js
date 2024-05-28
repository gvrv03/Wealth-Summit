import * as React from "react";
import { toast } from "react-hot-toast";
import { IconButton } from "@mui/material";

export default function Pegination({ page, setPage, noOfData, totalPages }) {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="flex justify-between border-t pt-5 items-center gap-5 text-sm ">
      <div className="text-gray-400   ">
        Total Records : {noOfData}
      </div>
      <div className="flex gap-5 items-center">
        <span className="text-gray-400">
          {page}-{noOfData} of {totalPages}
        </span>
        <div>
          {" "}
          <IconButton
            onClick={() => {
              if (page > 1) {
                setPage((page) => page - 1);
              }
            }}
            className="uil text-xl text-gray-400 uil-angle-left  "
            color="inherit"
          />{" "}
          <IconButton
            onClick={() => {
              if (page < totalPages) {
                setPage((page) => page + 1);
              } else {
                toast.error("You reach at the End!");
              }
            }}
            className="uil text-xl text-gray-400  uil-angle-right  "
            color="inherit"
          />
        </div>
      </div>
    </div>
  );
}
