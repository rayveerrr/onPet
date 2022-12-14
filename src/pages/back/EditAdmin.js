import React, { useState, useEffect } from 'react'

import Navbar from "../../components/Navbar";
import { TextField, Paper, Typography, Button, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Modal, Box } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { useParams } from 'react-router-dom';

import '../../index.css'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';
import useAuthentication from '../../hooks/auth/authenticate-user';

const editAdminModal = {
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

const EditAdmin = () => {

    // useAuthentication('User')

    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNum, setPhoneNum] = useState(0);
    const [cpass, setCPass] = useState('');

    const [ user, setUser] = useState([]);

    const usersCollectionRef = collection(db, "users");

    // Read all the product
    useEffect(() => {
        const getUsers = async () => {
          const data = await getDocs(usersCollectionRef);
          setUser(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
        }
        getUsers();
      }, []);

    const { id } = useParams();

    const [navVisible, showNavbar] = useState(false);

    // Modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  return (
    <div>
        <Navbar visible={ navVisible } show={ showNavbar } />
        <div className={!navVisible ? "page" : "page page-with-navbar"}>
            <Paper elevation={3} sx={{width: '80%', margin: 'auto'}}>
            <Typography variant='h4' sx={{textAlign: 'center', margin: 2}}>My account</Typography>
                <form style={{width: '80%', margin: 'auto'}}>
                {user.map((users) => {
                    return ( 
                        <div>
                            <TextField m={{width:'100%'}}
                                variant="outlined" 
                                label='Full Name' 
                                id="fullname" 
                                sx={{width: '48%', marginBottom:'10px', marginRight: '4%'}}
                                value={users.Name}  
                                multiline rows={1}   
                                disabled  
                            />
                            <TextField 
                                variant="outlined" 
                                label='Email Address' 
                                id="email" 
                                sx={{width: '48%', marginBottom:'10px'}}
                                value={users.Email} 
                                multiline rows={1}       
                                disabled 
                            />
                            <TextField 
                                variant="outlined" 
                                label='Phone Number' 
                                id="phoneNum" 
                                sx={{width: '48%', marginBottom:'10px'}}
                                value={users.PhoneNum} 
                                multiline rows={1}       
                                disabled 
                            />
                            <FormControl sx={{width: '60%', marginBottom:'10px'}}>
                                <FormLabel id="gender" 
                                >Gender</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="gender"
                                    name="gender"
                                    value={users.Gender}
                                    onChange={(e) => {setGender(e.target.value)}}
                                    disabled
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                    {/* palatandaan kung pano mag disable ng radiobutton */}
                                    {/* <FormControlLabel
                                    value="disabled"
                                    disabled
                                    control={<Radio />}
                                    label="other"
                                    /> */}
                                </RadioGroup>
                            </FormControl>
                            <TextField 
                                variant="outlined" 
                                label='Address' 
                                id="address"
                                multiline rows={3} 
                                sx={{width: '100%', marginBottom:'10px'}}
                                value={users.Address}       
                                disabled 
                            />
                            <TextField 
                                type='password'
                                variant="outlined"  
                                id="currentPassword" 
                                sx={{width: '48%', marginBottom:'10px', display:'flex'}}  
                                value={users.Password} 
                                disabled 
                            />
                            <Button variant='contained' color='success' onClick={handleOpen} startIcon={<EditIcon />} sx={{margin: '20px 0'}}>Edit admin info</Button>
                            {/* Ilalagay ko to sa modal */}
                            {/* <TextField 
                                variant="outlined" 
                                label='New Password' 
                                id="newPassword" 
                                sx={{width: '48%', marginBottom:'10px', display:'flex'}}      
                                required 
                            />
                            <TextField 
                                variant="outlined" 
                                label='Confirm New Password' 
                                id="confirmPassword" 
                                sx={{width: '48%', marginBottom:'10px', display:'flex'}}      
                                required 
                            /> */}
                            
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description"
                                >
                                <Box sx={{ ...editAdminModal, width: '60%' }}>
                                    <TextField m={{width:'100%'}}
                                        variant="outlined" 
                                        label='Full Name' 
                                        id="fullname" 
                                        sx={{width: '48%', marginBottom:'10px', marginRight: '4%'}}
                                        value={users.Name}  
                                        multiline rows={1}   
                                    />
                                    <TextField 
                                        variant="outlined" 
                                        label='Email Address' 
                                        id="email" 
                                        sx={{width: '48%', marginBottom:'10px'}}
                                        value={users.Email} 
                                        multiline rows={1}  
                                    />
                                    <TextField 
                                        variant="outlined" 
                                        label='Phone Number' 
                                        id="phoneNum" 
                                        sx={{width: '48%', marginBottom:'10px'}}
                                        value={users.PhoneNum} 
                                        multiline rows={1} 
                                    />
                                    <FormControl sx={{width: '60%', marginBottom:'10px'}}>
                                        <FormLabel id="gender" 
                                        >Gender</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="gender"
                                            name="gender"
                                            value={users.Gender}
                                            onChange={(e) => {setGender(e.target.value)}}
                                        >
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                                            {/* palatandaan kung pano mag disable ng radiobutton */}
                                            {/* <FormControlLabel
                                            value="disabled"
                                            disabled
                                            control={<Radio />}
                                            label="other"
                                            /> */}
                                        </RadioGroup>
                                    </FormControl>
                                    <TextField 
                                        variant="outlined" 
                                        label='Address' 
                                        id="address"
                                        multiline rows={3} 
                                        sx={{width: '100%', marginBottom:'10px'}}
                                        value={users.Address}    
                                    />
                                    <TextField 
                                        type='password'
                                        variant="outlined"  
                                        id="currentPassword" 
                                        sx={{width: '48%', marginBottom:'10px', display:'flex'}}  
                                        value={users.Password} 
                                    />
                                    <TextField 
                                        variant="outlined" 
                                        label='New Password' 
                                        id="newPassword" 
                                        sx={{width: '48%', marginBottom:'10px', display:'flex'}}      
                                    />
                                    <TextField 
                                        variant="outlined" 
                                        label='Confirm New Password' 
                                        id="confirmPassword" 
                                        sx={{width: '48%', marginBottom:'10px', display:'flex'}}    
                                    />
                                    <Button 
                                        variant="contained"
                                        className='save-btn'
                                        sx={{marginBottom: 2}}
                                    >
                                        Save Changes
                                    </Button> 
                                </Box>
                            </Modal>
                        </div>
                    );
                    })} 	      
                </form>
            </Paper>
        </div>
    </div>
  )
}

export default EditAdmin