import React from 'react';
import { Link } from 'react-router-dom'

// Styles
import '../../styles/header.css'


// image
import pac from '../../image/pawsandclaws.jpg'
import profile from '../../image/user.png'

// icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { borderRadius } from '@mui/system';
import { green } from '@mui/material/colors';
import { AppBar, Box, Container, Divider, Toolbar, Typography } from '@mui/material';

const Header = () => {
    const iconsStyle ={
        color: 'white',
    }
    const cartStyle = {
        color: 'white',
        marginRight: '20px'
    }
  return (
    <>
        {/* Header */}
        
        <AppBar elevation={0} sx={{padding: 0, margin: 0, backgroundColor: '#0D0D0D'}}>
                <div className='head-container'>
                    <Typography sx={{flex: 1}}>
                        Follow us on:
                        <a href="https://www.facebook.com/pawsandclaws081520/" target="_blank">
                            <IconButton aria-label="facebook" sx={{margin: 0, padding: 0}}>
                                <FacebookIcon fontSize='medium' style={iconsStyle} />
                            </IconButton>
                        </a>
                        <a href='#'>
                            <IconButton sx={{margin: 0, padding: 0}}>
                                <InstagramIcon fontSize='medium' style={iconsStyle} />
                            </IconButton>
                        </a>
                    </Typography>
                    <Typography>
                        Contact us on: 09123456789
                    </Typography>
                </div>
                <Divider sx={{padding: '3px', margin: 0}}/>
            <div className='appbar'>
                <Link to="/">
                    <img src={pac} className='logo-container' />
                </Link>
                <Container sx={{display: 'flex', alignItems: 'center'}}>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '80%', backgroundColor: 'white', borderRadius: '25px', margin: '0 20px' }}
                    >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search..."
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <Link to="/cart">
                    <ShoppingCartIcon fontSize='large' style={cartStyle} />
                </Link>

                </Container>
                <div className="dropdown">
                    <Link to="/myaccount">
                        <Avatar
                            alt="Profile"
                            src={profile}
                            sx={{ width: 56, height: 56, backgroundColor: 'white', padding: 0, margin: 0}}
                        >
                        </Avatar>
                    </Link>
                    <div className="dropdown-content">
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign-up</Link>
                        <Link to="/feedback">Feedback</Link>
                    </div>
                </div>
            </div>
        </AppBar>
    </>
  )
}

export default Header