import React, { useState, useEffect, useMemo } from "react";
import { Container, Divider, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";

import Navbar from "../../components/Navbar";

import { Button, IconButton, TableFooter } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Modal from "@mui/material/Modal";
import CheckIcon from "@mui/icons-material/Check";
import useAuthentication from "../../hooks/auth/authenticate-user";
import {
  getAllOrdersService,
  getMyOrdersService,
  orderStatusAcceptedService,
  orderStatusCompletedService,
  orderStatusRejectedService,
  orderUpdateStatusService,
} from "../../data/firebase/services/order.service";

const editStyle = {
  bgcolor: "green",
  color: "white",
  fontSize: 16,
  borderRadius: 8,
  "&:hover": {
    bgcolor: "white",
    color: "green",
  },
};
const acceptStyle = {
  bgcolor: "blue",
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

const sample = [
  {
    id: 1,
    itemName: "name",
    description: "Ongoing",
    price: "Ongoing",
    quantity: "Ongoing",
    image: "image",
  },
  {
    id: 2,
    itemName: "Ongoing",
    description: "Ongoing",
    price: "Ongoing",
    quantity: "Ongoing",
    image: "image",
  },
  {
    id: 3,
    itemName: "Ongoing",
    description: "Ongoing",
    price: "Ongoing",
    quantity: "Ongoing",
    image: "Ongoing",
  },
  {
    id: 4,
    itemName: "Ongoing",
    description: "Ongoing",
    price: "Ongoing",
    quantity: "Ongoing",
    image: "Ongoing",
  },
  {
    id: 5,
    itemName: "Ongoing",
    description: "Ongoing",
    price: "Ongoing",
    quantity: "Ongoing",
    image: "Ongoing",
  },
  {
    id: 6,
    itemName: "Ongoing",
    description: "Ongoing",
    price: "Ongoing",
    quantity: "Ongoing",
    image: "Ongoing",
  },
  {
    id: 7,
    itemName: "Ongoing",
    description: "Ongoing",
    price: "Ongoing",
    quantity: "Ongoing",
    image: "Ongoing",
  },
];

// Pet history Modal

const phModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Transaction = () => {
  useAuthentication("Admin");

  const [orders, setOrders] = useState([]);
  const [finalLists, setFinalLists] = useState([]);
  const [finalStatus, setFinalStatus] = useState([]);
  const [Payment, setPayment] = useState([]);

  const ordersCollectionRef = collection(db, "Orders");

  useEffect(() => {
    const getOrders = async () => {
      const orders = await getAllOrdersService();
      setOrders(orders);
    };
    getOrders();
  }, []);

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sample.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const getOrders = async () => {
      const data = await getDocs(ordersCollectionRef);
      // get the order number so it will filter and create a table for the products that has the same ordernumber. will try fix this again tomorrow morning.
      const orderList = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter(
          (order) =>
            order.Status === "On Process" || order.Status === "On Request"
        );
      let uniqueOrderId = [
        ...new Set(orderList.map((order) => order.OrderNumber)),
      ];
      let uniqueOrderStatus = [
        ...new Set(orderList.map((order) => order.Status)),
      ];
      const finalList = uniqueOrderId.map((orderNumber) => ({
        orderNumber,
        orders: orderList.filter((order) => order.OrderNumber == orderNumber),
      }));
      const finalStat = uniqueOrderStatus.map((finalstatus) => ({
        finalstatus,
        finalStats: orderList.filter((order) => order.Status == finalstatus),
      }));
      setOrders(orderList);
      setFinalLists(finalList);
    };
    getOrders();
  }, []);

  // tingin ko need ko mag loop hanggang sa macomplete lahat ng status ng isang order number pag sa pag pindot ng button.
  const submitUpdateOrderStatus = async (OrderNumber, Status) => {
    await orderUpdateStatusService(OrderNumber, Status);
    //refresj data
    const myOrders = await getMyOrdersService();
    setOrders(myOrders);
    alert("Status updated.");
  };

  const sumOfPrice = useMemo(() => {
    let totalAmount = 0;
    // fix mo to ver. kukunin mo yung order number lahat ng magkakaparehas na order number pag aaddin mo yung mga price tas ilagay sa total amount.
    finalLists.forEach((orderItem) => (totalAmount += orderItem.totalAmount));
    return totalAmount;
  }, [finalLists]);

  return (
    <div>
      <Navbar visible={navVisible} show={showNavbar} />
      <div className={!navVisible ? "page" : "page page-with-navbar"}>
        <Paper sx={{ width: "90%", margin: "5% auto" }}>
          <Typography variant="h4" sx={{ marginLeft: "1%" }}>
            List of Order request
          </Typography>

          {finalLists.map((order) => {
            return (
              <>
                <Paper sx={{ width: "50%", marginBottom: "10px" }}>
                  <Container
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="title">
                      Order number: {order.orders[0].OrderNumber}
                    </Typography>
                    <Typography variant="title">
                      Status: {order.orders[0].Status}
                    </Typography>
                  </Container>
                  <Container
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="title">
                      Email: {order.orders[0].Email}
                    </Typography>
                    <Typography variant="title">
                      Payment Method: {order.orders[0].Payment}
                    </Typography>
                  </Container>
                  {order.orders.map((actualOrder) => {
                    return (
                      <>
                        <Container
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            marginTop: "15px",
                          }}
                        >
                          <Typography variant="title">
                            Product Name: {actualOrder.ProdName}
                          </Typography>
                          <Typography variant="title">
                            Quantity: {actualOrder.Quantity}
                          </Typography>
                          <Typography variant="title">
                            Total Amount: {actualOrder.totalAmount}
                          </Typography>
                          <Divider />
                        </Container>
                      </>
                    );
                  })}
                  <Typography variant="title">
                    Total Payment: {sumOfPrice}
                  </Typography>
                  <IconButton
                    sx={acceptStyle}
                    onClick={() =>
                      submitUpdateOrderStatus(
                        order.orders[0].OrderNumber,
                        "On Process"
                      )
                    }
                  >
                    Accept
                    <CheckIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    sx={deleteStyle}
                    onClick={() =>
                      submitUpdateOrderStatus(
                        order.orders[0].OrderNumber,
                        "Rejected"
                      )
                    }
                  >
                    Reject
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    sx={editStyle}
                    onClick={() =>
                      submitUpdateOrderStatus(
                        order.orders[0].OrderNumber,
                        "Completed"
                      )
                    }
                  >
                    Complete
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Paper>
              </>
            );
          })}

          {/* <div style={{ height: '40%', width: '80%'}}>
                      <DataGrid
                        rows={petRows}
                        columns={petColumns}
                        pageSize={5}
                        rowsPerPageOptions={[2]}
                    />
                    </div> */}
        </Paper>
      </div>
    </div>
  );
};

export default Transaction;
