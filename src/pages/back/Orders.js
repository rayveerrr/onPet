import React, { useState } from 'react'
import { Paper, Typography } from "@mui/material";

import { collection, addDoc, getDocs, doc } from 'firebase/firestore'
import {auth, db, storage} from '../../firebase-config'
import { ref } from 'firebase/storage'

import Navbar from "../../components/Navbar";
import {Button, IconButton, TableFooter, TextField} from '@mui/material';
import Table from '@mui/material/Table';
  import TableBody from '@mui/material/TableBody';
  import TableCell from '@mui/material/TableCell';
  import TableContainer from '@mui/material/TableContainer';
  import TableHead from '@mui/material/TableHead';
  import TableRow from '@mui/material/TableRow';
  import CheckIcon from '@mui/icons-material/Check';
  import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
  import DeleteIcon from '@mui/icons-material/Delete';
  import TablePagination from '@mui/material/TablePagination';
  import Box from '@mui/material/Box';
  import AddBoxIcon from '@mui/icons-material/AddBox';
  import Modal from '@mui/material/Modal';

import '../../index.css'
import useAuthentication from '../../hooks/auth/authenticate-user';

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
const hideStyle = {
  bgcolor: 'gray',
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


const data = [
    { id: 1, itemName: 'name', description: 'Ongoing', price: 'Ongoing', quantity: 'Ongoing', image: 'image'},
    { id: 2, itemName: 'Ongoing', description: 'Ongoing', price: 'Ongoing', quantity: 'Ongoing', image: 'image'},
    { id: 3, itemName: 'Ongoing', description: 'Ongoing', price: 'Ongoing', quantity: 'Ongoing', image: 'Ongoing'},
    { id: 4, itemName: 'Ongoing', description: 'Ongoing', price: 'Ongoing', quantity: 'Ongoing', image: 'Ongoing'},
    { id: 5, itemName: 'Ongoing', description: 'Ongoing', price: 'Ongoing', quantity: 'Ongoing', image: 'Ongoing'},
    { id: 6, itemName: 'Ongoing', description: 'Ongoing', price: 'Ongoing', quantity: 'Ongoing', image: 'Ongoing'},
    { id: 7 , itemName: 'Ongoing', description: 'Ongoing', price: 'Ongoing', quantity: 'Ongoing', image: 'Ongoing'},
  ]



const Orders = () => {

  // useAuthentication('User')

    const [navVisible, showNavbar] = useState(false);

    const orderStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }
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
            <Navbar visible={ navVisible } show={ showNavbar } />
            <div className={!navVisible ? "page" : "page page-with-navbar"} style={orderStyle}>
            <Paper sx={{textAlign: 'center'}}>
            <Typography variant='h4' sx={{textAlign: 'center' }}>Orders</Typography>
            <TableContainer sx={{display: 'flex', justifyContent: 'center'}} >
              <Table sx={{ minWidth: 700, width: '100%' }} aria-label="customized table">
                <TableHead sx={{bgcolor: 'black'}}>
                  <TableRow>
                    <TableCell sx={{color: 'white'}}>Item ID</TableCell>
                    <TableCell align="right" sx={{color: 'white'}}>Order ID</TableCell>
                    <TableCell align="right" sx={{color: 'white'}}>User ID</TableCell>
                    <TableCell align="right" sx={{color: 'white'}}>Order Details ID</TableCell>
                    <TableCell align="right" sx={{color: 'white'}}>Prod ID</TableCell>
                    <TableCell align="right" sx={{color: 'white'}}>Total Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{(rowsPerPage > 0
                      ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : data
                    ).map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.itemName}</TableCell>
                      <TableCell align="right">{row.description}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                      <TableCell align="right">{row.image}</TableCell>
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
                        colSpan={7}
                        count={data.length}
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
                </Paper>
            </div>
        </div>
    )
}

export default Orders