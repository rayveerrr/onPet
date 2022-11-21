import React, { useEffect, useState } from 'react'
import {Routes, Route} from "react-router-dom";
import { Link } from 'react-router-dom'

// component
import Header from '../../components/frontend/Header'
import Footer from '../../components/frontend/Footer';
import Sidebar from '../../components/frontend/Sidebar';

//styles
import '../../styles/myaccount.css'

// icons
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// image
import profile from '../../image/user.png'


//MUI
import { TextField, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, Typography } from '@mui/material';
import useAuthentication from '../../hooks/auth/authenticate-user';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';





const MyAccount = () => {

    useAuthentication('User')

    const [user, setUser] = useState([]);

    const usersCollectionRef = collection(db, "users")

    useEffect(() => {
        const fetch = async () => {
            const data = await getDocs(usersCollectionRef);
            setUser(data.docs.map((doc) => ({...doc.data(), id: doc.id })).filter(userInfo => (userInfo.Email === sessionStorage.getItem('email'))))
        }
        fetch();
    }, [])

    const txtFieldStyle = {
        marginBottom: '10px'
      };
    return (
        <>
            <Header />
                {user.map((users) => {
                return (
                    <>
                        <div className="main-content-container">
                            <Sidebar />
                            <div className="myaccount-container">
                                <div className="accountdata-container">
                                    <Typography variant='h3' sx={{marginBottom: 2}}> My Profile</Typography>
                                    <TextField 
                                        variant="outlined" 
                                        label='Name' 
                                        id="name" 
                                        value={users.Name}
                                        fullWidth
                                        sx={txtFieldStyle}  />
                                    <TextField 
                                        type='email'
                                        variant="outlined" 
                                        label='Email' 
                                        id="email" 
                                        value={users.Email}
                                        fullWidth
                                        sx={txtFieldStyle}  />
                                    <TextField 
                                        variant="outlined" 
                                        label='Phone number' 
                                        id="phoneNum" 
                                        value={users.PhoneNum}
                                        fullWidth
                                        sx={txtFieldStyle}  />
                                    <TextField 
                                        variant="outlined" 
                                        label='Address' 
                                        id="address" 
                                        value={users.Address}
                                        fullWidth
                                        multiline
                                        rows={2}
                                        sx={txtFieldStyle}  />
                                    <FormControl fullWidth>
                                        <FormLabel id="gender" 
                                        >Gender</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="gender"
                                            name="gender"
                                            value={users.Gender}
                                            sx={txtFieldStyle}
                                        >
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                                        </RadioGroup>
                                    </FormControl>
                                    <TextField 
                                        type='password'
                                        variant="outlined" 
                                        label='Password' 
                                        id="password" 
                                        value={users.Password}
                                        fullWidth
                                        sx={txtFieldStyle}  />
                                </div>
                                <div className="accountprofile-container">
                                    <div className="image-container">
                                        <img src={profile} alt="User profile" />
                                    </div>
                                    <button>Select image</button>
                                    <label> File extension: .JPEG .PNG</label>
                                </div>
                            </div>
                        </div>
                    </>
                    )
                })}
            <Footer />
        </>
    )
}

export default MyAccount