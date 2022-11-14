import React from 'react'
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
import { TextField, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import useAuthentication from '../../hooks/auth/authenticate-user';





const MyAccount = () => {

    useAuthentication('User')

    const txtFieldStyle = {
        marginBottom: '10px'
      };
    return (
        <>
            <Header />
            <div className="main-content-container">
                <Sidebar />
                <div className="myaccount-container">
                    <div className="accountdata-container">
                        <h1>My Profile</h1>
                        <TextField 
                            variant="outlined" 
                            label='Name' 
                            id="name" 
                            fullWidth
                            required
                            sx={txtFieldStyle}  />
                        <TextField 
                            variant="outlined" 
                            label='Email' 
                            id="email" 
                            fullWidth
                            required
                            sx={txtFieldStyle}  />
                        <TextField 
                            variant="outlined" 
                            label='Phone number' 
                            id="phoneNum" 
                            fullWidth
                            required
                            sx={txtFieldStyle}  />
                        <FormControl fullWidth>
                            <FormLabel id="gender" 
                            >Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="gender"
                                name="gender"
                                sx={txtFieldStyle}
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>
                        <label>Birthdate</label>
                        <TextField 
                            type='date'
                            variant="outlined"  
                            id="phoneNum" 
                            fullWidth
                            required  />
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
            <Footer />
        </>
    )
}

export default MyAccount