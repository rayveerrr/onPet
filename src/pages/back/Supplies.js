import React, { useEffect, useState } from 'react'
import { Paper, Typography } from "@mui/material";

import { collection, addDoc, getDocs, doc, deleteDoc, } from 'firebase/firestore'
import {auth, db, storage} from '../../firebase-config'
import { ref } from 'firebase/storage'

import Navbar from "../../components/Navbar";
import {Button, IconButton, TableFooter, TextField, FormControl, MenuItem, InputLabel, Select} from '@mui/material';
import Table from '@mui/material/Table';
  import TableBody from '@mui/material/TableBody';
  import TableCell from '@mui/material/TableCell';
  import TableContainer from '@mui/material/TableContainer';
  import TableHead from '@mui/material/TableHead';
  import TableRow from '@mui/material/TableRow';
  import EditIcon from '@mui/icons-material/Edit';
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

  const suppliesModal = {
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

  const data = [
    { id: 1, itemName: 'name', description: 'Ongoing', price: 'Ongoing', quantity: 'Ongoing', image: 'image'},
    { id: 2, itemName: 'Ongoing', description: 'Ongoing', price: 'Ongoing', quantity: 'Ongoing', image: 'image'},
    { id: 3, itemName: 'Ongoing', description: 'Ongoing', price: 'Ongoing', quantity: 'Ongoing', image: 'Ongoing'},
    { id: 4, itemName: 'Ongoing', description: 'Ongoing', price: 'Ongoing', quantity: 'Ongoing', image: 'Ongoing'},
    { id: 5, itemName: 'Ongoing', description: 'Ongoing', price: 'Ongoing', quantity: 'Ongoing', image: 'Ongoing'},
    { id: 6, itemName: 'Ongoing', description: 'Ongoing', price: 'Ongoing', quantity: 'Ongoing', image: 'Ongoing'},
    { id: 7 , itemName: 'Ongoing', description: 'Ongoing', price: 'Ongoing', quantity: 'Ongoing', image: 'Ongoing'},
  ]

 


const Supplies = () => {

  // useAuthentication('User')

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const [navVisible, showNavbar] = useState(false);

    const orderStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }
      const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(5);
  
      const [category, setCategory] = useState('');
      const [description, setDescription] = useState('');
      const [price, setPrice] = useState(0);
      const [prodName, setProdName] = useState('');
      const [quantity, setQuantity] = useState(0);

      const [ product, setProduct] = useState([]);

      const productCollectionRef = collection(db, "Product");

      // Add new product
      const addProduct = async () => {
        try {
          await addDoc(productCollectionRef, {Category: category , Description: description , Price: price , ProdName: prodName , Quantity: quantity})
        }catch(e){
            console.log(e);
        }
      }

      // Read all the product
      useEffect(() => {
        const getProduct = async () => {
          const data = await getDocs(productCollectionRef);
          setProduct(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
        }
        getProduct();
      }, []);

      // Delete ng product
      const deleteProduct = async(id) => {
        const productDoc = doc(db, "Product", id);
        await deleteDoc(productDoc)
      }

      // not working pero walang error. pag upload naman ng image to

      const [ img, setImg ] = useState('');

      const handleImage = (e) => {
        e.preventDefault();
        let pickedFile;
        if(e.target.files && e.target.files.length>0){
          pickedFile=e.target.file[0];
          setImg(pickedFile);
        }
      }

      const singleUpload = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref("Images")
        .child('image1')
        .put(img);
        uploadTask.on(
          'state_changed',
          (snapshot)=>{
            let progress=((snapshot.bytesTransferred/snapshot.totalBytes)*100);
            console.log(progress);
          },
          (err)=>{
            console.log(err)
          },
          ()=> {
            storage.ref("Images")
            .child('image1')
            .getDownloadURL()
            .then((imageUrL)=>{
              db.collection("Images")
              .add({
                imgUrl: imageUrL,
              });
            })
          }
        )
      }

      const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productCollectionRef.length) : 0;
  
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
            <Typography variant='h4' sx={{textAlign: 'center' }}>List of product</Typography>
            <TableContainer sx={{display: 'flex', justifyContent: 'center'}} >
              <Table sx={{ minWidth: 700, width: '100%' }} aria-label="customized table">
                <TableHead sx={{bgcolor: 'black'}}>
                  <TableRow>
                    <TableCell align="right" sx={{color: 'white'}}>Item name</TableCell>
                    <TableCell align="center" sx={{color: 'white'}}>Description</TableCell>
                    <TableCell align="right" sx={{color: 'white'}}>Price</TableCell>
                    <TableCell align="right" sx={{color: 'white'}}>Quantity</TableCell>
                    <TableCell align="right" sx={{color: 'white'}}>Category</TableCell>
                    <TableCell align="right" sx={{color: 'white'}}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{(rowsPerPage > 0
                      ? product.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : product
                    ).map((prod) => (
                    <TableRow key={prod.name}>
                      <TableCell align="right">{prod.ProdName}</TableCell>
                      <TableCell align="center">{prod.Description}</TableCell>
                      <TableCell align="right">{prod.Price}</TableCell>
                      <TableCell align="right">{prod.Quantity}</TableCell>
                      <TableCell align="right">{prod.Category}</TableCell>
                      <TableCell align="right">
                        <IconButton sx={editStyle}>Edit<EditIcon fontSize='small'/></IconButton> 
                        <IconButton sx={deleteStyle} onClick={() => {deleteProduct(prod.id)}} >Delete<DeleteIcon fontSize='small'/></IconButton>
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
                        colSpan={7}
                        count={product.length}
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
            
            <Button variant='contained' color='success' onClick={handleOpen} startIcon={<AddBoxIcon />} sx={{float: 'right', margin: 3}}>Add new product</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box sx={{ ...suppliesModal, width: '60%' }}>
                  <form style={{width: '100%', margin: '10px auto', border: '1px lightgray solid', padding: 15, borderRadius: 9}}>
                    <Typography variant='h4' sx={{textAlign: 'left' }}>Add new item</Typography>
                    <TextField m={{width:'100%'}}
                        variant="outlined" 
                        label='Item name' 
                        id="itemName" 
                        onChange={(e) => {setProdName(e.target.value)}}
                        sx={{width: '50%', marginBottom:'10px', marginRight: '2%'}}      
                        required 
                    />
                    <TextField m={{width:'100%'}}
                        variant="outlined" 
                        label='Price' 
                        id="price" 
                        onChange={(e) => {setPrice(e.target.value)}}
                        sx={{width: '23%', marginBottom:'10px', marginRight: '2%'}}      
                        required 
                    />
                    <TextField 
                        variant="outlined" 
                        label='Quantity' 
                        id="quantity" 
                        onChange={(e) => {setQuantity(e.target.value)}}
                        sx={{width: '23%', marginBottom:'10px'}}      
                        required 
                    />
                    <TextField 
                        variant="outlined" 
                        label='Description' 
                        id="description" 
                        onChange={(e) => {setDescription(e.target.value)}}
                        sx={{width: '100%', marginBottom:'10px'}} 
                        multiline rows={4}  
                        required 
                    />
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Category</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="category"
                        onChange={(e) => {setCategory(e.target.value)}}
                        label="Select Category"
                      >
                        <MenuItem value='food'>Pet Food</MenuItem>
                        <MenuItem value='supplement'>Pet Supplement</MenuItem>
                        <MenuItem value='cage'>Pet Cage</MenuItem>
                        <MenuItem value='accessories'>Pet Accessories</MenuItem>
                        <MenuItem value='feeders'>Pet Feeders/Bowls</MenuItem>
                        <MenuItem value='treats'>Pet Treats</MenuItem>
                      </Select>
                    </FormControl>
                    <input type='file' onChange={handleImage}/>
                    <Button variant='contained' onClick={singleUpload}>Upload Image</Button>
                    <div>
                    <Button variant="contained"
                            className='save-btn'
                            fullWidth
                            sx={{marginTop: 2}}
                            onClick={addProduct}
                    >
                      ADD NEW ITEM
                    </Button>  
                    </div>	      
                  </form>
              </Box>
            </Modal>
          </Paper>
        </div>
    </div>
  )
}

export default Supplies