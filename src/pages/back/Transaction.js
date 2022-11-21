import React, { useState, useEffect } from 'react'
import { Paper, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { collection, addDoc, getDocs, doc } from 'firebase/firestore'
  import {auth, db} from '../../firebase-config'

import Navbar from "../../components/Navbar";

import { Button, IconButton, TableFooter} from '@mui/material';
import Table from '@mui/material/Table';
  import TableBody from '@mui/material/TableBody';
  import TableCell from '@mui/material/TableCell';
  import TableContainer from '@mui/material/TableContainer';
  import TableHead from '@mui/material/TableHead';
  import TableRow from '@mui/material/TableRow';
  import DeleteIcon from '@mui/icons-material/Delete';
  import TablePagination from '@mui/material/TablePagination';
  import Box from '@mui/material/Box';
  import AddBoxIcon from '@mui/icons-material/AddBox';
  import Modal from '@mui/material/Modal';
  import CheckIcon from '@mui/icons-material/Check';
import useAuthentication from '../../hooks/auth/authenticate-user';
import { getMyOrdersService, orderStatusAcceptedService, orderStatusCompletedService, orderStatusRejectedService, orderUpdateStatusService } from '../../data/firebase/services/order.service';

  const editStyle = {
    bgcolor: 'green',
    color: 'white',
    fontSize: 16,
    borderRadius: 8,
    marginRight: 1,
    '&:hover': {
      bgcolor: 'white',
      color: 'green',
    }
  }
  const acceptStyle = {
    bgcolor: 'blue',
    color: 'white',
    fontSize: 16,
    borderRadius: 8,
    '&:hover': {
      bgcolor: 'white',
      color: 'gray',
    }
  }
  const deleteStyle = {
    bgcolor: 'red',
    color: 'white',
    fontSize: 16,
    borderRadius: 8,
    '&:hover': {
      bgcolor: 'white',
      color: 'red',
    }
    
  }

  const sample = [
    { id: 1, itemName: 'name', description: 'Ongoing', price: 'Ongoing', quantity: 'Ongoing', image: 'image'},
    { id: 2, itemName: 'Ongoing', description: 'Ongoing', price: 'Ongoing', quantity: 'Ongoing', image: 'image'},
    { id: 3, itemName: 'Ongoing', description: 'Ongoing', price: 'Ongoing', quantity: 'Ongoing', image: 'Ongoing'},
    { id: 4, itemName: 'Ongoing', description: 'Ongoing', price: 'Ongoing', quantity: 'Ongoing', image: 'Ongoing'},
    { id: 5, itemName: 'Ongoing', description: 'Ongoing', price: 'Ongoing', quantity: 'Ongoing', image: 'Ongoing'},
    { id: 6, itemName: 'Ongoing', description: 'Ongoing', price: 'Ongoing', quantity: 'Ongoing', image: 'Ongoing'},
    { id: 7 , itemName: 'Ongoing', description: 'Ongoing', price: 'Ongoing', quantity: 'Ongoing', image: 'Ongoing'},
  ]


// Pet history Modal

const phModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

const PetHistory = () => {

  useAuthentication('User')

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    const [address, setAddress] = useState('');
    const [orderID, setOrderID] = useState('');
    const [transactionID, setTransactionID] = useState('');
    const [status, setStatus] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [userID, setUserID] = useState('');
    const [usersName, setUsersName] = useState('');
    const [date, setDate] = useState('');


    const [ageErr, setAgeErr] = useState('');
    const [breedErr, setBreedErr] = useState('');
    const [dateErr, setDateErr] = useState('');
    const [genderErr, setGenderErr] = useState('');
    const [ownerNameErr, setOwnerNameErr] = useState('');
    const [petNameErr, setPetNameErr] = useState('');
    const [remarksErr, setRemarksErr] = useState('');
    const [speciesErr, setSpeciesErr] = useState('');
    const [healthHistoryErr, setHealthHistoryErr] = useState('');
  
    const [orders, setOrders] = useState([]);
  
    const ordersCollectionRef = collection(db, "Orders");
    
    useEffect(() => {
      const getOrders = async () => {
        const orders = await getMyOrdersService();
        setOrders(orders)
      }
      getOrders();
    }, []);

    const [navVisible, showNavbar] = useState("false");

    const orderStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }
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

      const submitUpdateStatusOrder = async (id, Status) => {
        await orderUpdateStatusService(id, Status)
        const myOrders = await getMyOrdersService()
        setOrders(myOrders)
        alert('Status updated.')
      }

  return (
    <div>
        <Navbar visible={ navVisible } show={ showNavbar } />
        <div className={!navVisible ? "page" : "page page-with-navbar"}>
                <Paper elevation={3} sx={{width: '90%', margin: '5% auto'}}>
                    <Typography variant='h4' sx={{marginLeft: '1%',}}>List of Order request</Typography>
                      
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                      >
                        <Box sx={{ ...phModal, width: '80%' }}>
                          <Paper sx={{marginTop: 3, width: '100%', padding: 4}}>
                    </Paper>
                        </Box>
                      </Modal>
                    <TableContainer sx={{display: 'flex', justifyContent: 'center'}} >
                    <Table sx={{ minWidth: 700, width: '100%' }} aria-label="customized table">
                      <TableHead sx={{bgcolor: 'black'}}>
                        <TableRow>
                          <TableCell align="left" sx={{color: 'white', fontSize: '17px'}}>Order ID</TableCell>
                          <TableCell align="left" sx={{color: 'white', fontSize: '17px'}}>User ID</TableCell>
                          <TableCell align="left" sx={{color: 'white', fontSize: '17px'}}>Order Number</TableCell>
                          <TableCell align="left" sx={{color: 'white', fontSize: '17px'}}>Product ID</TableCell>
                          <TableCell align="left" sx={{color: 'white', fontSize: '17px'}}>Quantity</TableCell>
                          <TableCell align="left" sx={{color: 'white', fontSize: '17px'}}>Total Amount</TableCell>
                          <TableCell align="left" sx={{color: 'white', fontSize: '17px'}}>Payment Method</TableCell>
                          <TableCell align="left" sx={{color: 'white', fontSize: '17px'}}>Status</TableCell>
                          <TableCell align="center" sx={{color: 'white', fontSize: '17px'}}>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>{(rowsPerPage > 0
                            ? orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : orders
                          ).map((order) => (
                          <TableRow key={order.id}>
                            <TableCell align="left">{order.id}</TableCell>
                            <TableCell align="left">{order.Email}</TableCell>
                            <TableCell align="left">{order.OrderNumber}</TableCell>
                            <TableCell align="left">{order.ProdID}</TableCell>
                            <TableCell align="left">{order.Quantity}</TableCell>
                            <TableCell align="left">{order.totalAmount}</TableCell>
                            <TableCell align="left">{order.Payment}</TableCell>
                            <TableCell align="right">{order.Status}</TableCell> 
                            <TableCell align="left">
                              {/* Aayusin ko pa kapag same order number dapat iisang table lang, bali ang gagawin ko isang table per same order number tapos dapat hindi kasama sa loop yung mga button. Tapos kapag pinindot si button dapat mag uupdate na lahat ng status ng may same order number according sa pipinduting button
                              ang gagwin kong design ay parang receipt para maangas chariz hahahaha*/}
                              <IconButton sx={acceptStyle} onClick={() => submitUpdateStatusOrder(order.id, 'On Process')}>Accept<CheckIcon fontSize='small'/></IconButton> 
                              <IconButton sx={deleteStyle} onClick={() => submitUpdateStatusOrder(order.id, 'Rejected')}>Reject<DeleteIcon fontSize='small'/></IconButton>
                              <IconButton sx={editStyle} onClick={() => submitUpdateStatusOrder(order.id, 'Completed')}>Complete<DeleteIcon fontSize='small'/></IconButton>
                            </TableCell>
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
                              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                              colSpan={10}
                              count={orders.length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              SelectProps={{
                                inputProps: {
                                  'aria-label': 'rows per page',
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
  )
}

export default PetHistory