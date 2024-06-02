"use client";
import * as React from "react";
import moment from "moment";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSkeleton from "@/Components/Skeleton/TableSkeleton";
import { IconButton } from "@mui/material";
import EditTable from "./EditTable";
import ReturnRole from "./ReturnRole";

export default function MaintableCom({ data, colData, isLoading, count }) {
  return (
    <Paper
      className="no-scrollbar "
      style={{
        boxShadow: "none",
        width: "100%",
        background: "transparent",
      }}
    >
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <TableContainer
          style={{
            maxHeight: 500,
            background: "",
          }}
        >
          <Table
            stickyHeader
            className="no-scrollbar"
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                {count > 0 && (
                  <TableCell
                    className="bg-secondary"
                    style={{
                      fontSize: "12px",
                      color: "white",
                      border: "none",
                      padding: "8px",
                      textTransform: "capitalize",
                      fontWeight: 600,
                    }}
                    align="left"
                  >
                    Sr.No.
                  </TableCell>
                )}
                {colData?.map((col, index) => (
                  <TableCell
                    key={index}
                    className="bg-secondary"
                    style={{
                      fontSize: "12px",
                      color: "white",
                      background: "#212/22b",
                      border: "none",
                      padding: "8px",
                      textTransform: "capitalize",
                      fontWeight: 600,
                    }}
                    align="left"
                  >
                    {col === "image" ||
                    col === "artical" ||
                    col === "comments" ||
                    col === "images" ||
                    col === "pricing" ||
                    col === "__v" ||
                    col === "productOrganization" ||
                    col === "thumbnail" ||
                    col === "keywords" ||
                    col === "reviews" ||
                    col === "notification" ||
                    col === "password" ||
                    col === "UserImages"
                      ? null
                      : col}
                  </TableCell>
                ))}
                {count > 0 && (
                  <TableCell
                    className="bg-secondary"
                    style={{
                      fontSize: "12px",
                      color: "white",
                      border: "none",
                      padding: "8px",
                      textTransform: "capitalize",
                      fontWeight: 600,
                    }}
                    align="left"
                  >
                    Edit
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((item, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell
                      style={{
                        fontSize: "12px",
                        padding: "8px",
                        border: "none",
                        color: "white",
                      }}
                      align="center"
                    >
                      {index + 1}
                    </TableCell>
                    {colData?.map((col, index) => {
                      return (
                        <TableCell
                          // contentEditable={true}
                          key={index}
                          style={{
                            fontSize: "12px",
                            padding: "8px",
                            color: "white",
                            border: "none",
                          }}
                          align="left"
                        >
                          {col === "image" ||
                          col === "artical" ||
                          col === "comments" ||
                          col === "images" ||
                          col === "__v" ||
                          col === "pricing" ||
                          col === "productOrganization" ||
                          col === "thumbnail" ||
                          col === "keywords" ||
                          col === "UserImages" ||
                          col === "reviews" ||
                          col === "notification" ||
                          col === "password" ? null : col === "role" ? (
                            <ReturnRole id={item[col]} />
                          ) : col === "date" ? (
                            moment(item[col]).format("DD/MM/YYYY")
                          ) : col === "createdAt" ? (
                            moment(item[col]).format("DD/MM/YYYY")
                          ) : col === "updatedAt" ? (
                            moment(item[col]).format("DD/MM/YYYY")
                          ) : (
                            item[col]
                          )}
                        </TableCell>
                      );
                    })}
                    <TableCell
                      style={{
                        fontSize: "12px",
                        padding: "8px",
                        border: "none",
                      }}
                      align="center"
                    >
                      <EditTable />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {!isLoading && count === 0 && (
        <div className="p-5  bg-gray-950   text-center font-semibold">
          No Data Found
        </div>
      )}
    </Paper>
  );
}
