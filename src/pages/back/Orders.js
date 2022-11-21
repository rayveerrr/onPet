import React, { useState } from "react";
import { Paper, Typography } from "@mui/material";

import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase-config";
import { ref } from "firebase/storage";

import Navbar from "../../components/Navbar";
import { Button, IconButton, TableFooter, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CheckIcon from "@mui/icons-material/Check";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Modal from "@mui/material/Modal";

import "../../index.css";
import useAuthentication from "../../hooks/auth/authenticate-user";

const editStyle = {
  bgcolor: "green",
  color: "white",
  fontSize: 16,
  borderRadius: 8,
  marginRight: 1,
  "&:hover": {
    bgcolor: "white",
    color: "green",
  },
};
const hideStyle = {
  bgcolor: "gray",
  color: "white",
  fontSize: 16,
  borderRadius: 8,
  "&:hover": {
    bgcolor: "white",
    color: "gray",
  },
};
const deleteStyle = {
  bgcolor: "red",
  color: "white",
  fontSize: 16,
  borderRadius: 8,
  "&:hover": {
    bgcolor: "white",
    color: "red",
  },
};

const data = [
  {
    id: 1,
    orderNumber: "1234",
    Username: "Leenard Taboy",
    Status: "Completed",
    TotalAmount: "10000",
  },
  {
    id: 2,
    orderNumber: "1235",
    Username: "Ric Angelo Aristosa",
    Status: "Completed",
    TotalAmount: "3000",
  },
  {
    id: 3,
    orderNumber: "2314",
    Username: "Gio Matthew Bayna",
    Status: "Completed",
    TotalAmount: "10000",
  },
  {
    id: 4,
    orderNumber: "5323",
    Username: "Jarl Renzo Naguit",
    Status: "Rejected",
    TotalAmount: "2315",
  },
  {
    id: 5,
    orderNumber: "1263",
    Username: "Reyver Bautista",
    Status: "Completed",
    TotalAmount: "7531",
  },
  {
    id: 6,
    orderNumber: "3013",
    Username: "Pedro Penduko",
    Status: "Rejected",
    TotalAmount: "300",
  },
  {
    id: 7,
    orderNumber: "4312",
    Username: "Coco Martin",
    Status: "Completed",
    TotalAmount: "100",
  },
];

const Orders = () => {
  useAuthentication("Admin");

  const [navVisible, showNavbar] = useState("false");

  const orderStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Navbar visible={navVisible} show={showNavbar} />
      <div
        className={!navVisible ? "page" : "page page-with-navbar"}
        style={orderStyle}
      >
        <Paper sx={{ textAlign: "center", margin: "5% auto" }}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Purchased History
          </Typography>
          <TableContainer sx={{ display: "flex", justifyContent: "center" }}>
            <Table
              sx={{ minWidth: 700, width: "100%" }}
              aria-label="customized table"
            >
              <TableHead sx={{ bgcolor: "black" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>
                    Purchased History ID
                  </TableCell>
                  <TableCell align="left" sx={{ color: "white" }}>
                    Order Number
                  </TableCell>
                  <TableCell align="left" sx={{ color: "white" }}>
                    Username
                  </TableCell>
                  <TableCell align="left" sx={{ color: "white" }}>
                    Status
                  </TableCell>
                  <TableCell align="left" sx={{ color: "white" }}>
                    Total Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? data.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : data
                ).map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.orderNumber}</TableCell>
                    <TableCell align="left">{row.Username}</TableCell>
                    <TableCell align="left">{row.Status}</TableCell>
                    <TableCell align="left">{row.TotalAmount}</TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={7}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
};

export default Orders;
