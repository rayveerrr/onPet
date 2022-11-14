import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

//components
import Header from '../../components/frontend/Header'

//styles
import '../../styles/homepage.css'

// image
import petfood from '../../image/pet-food-category.png'
import petvit from '../../image/pet-vit-category.png'
import petaccessories from '../../image/pet-accessories-category.png'
import petcage from '../../image/pet-cage-category.png'
import petbowl from '../../image/pet-feeder-category.png'
import pettreats from '../../image/pet-treat-category.png'
import { Box } from '@mui/material';
import Footer from '../../components/frontend/Footer';


const HomePage = () => {
    const boxStyle = {
        backgroundColor: 'white', 
        color: 'black',
        height: '100%',
        width: '16%',
        "&:hover": {
            backgroundColor: 'black',
            color: 'white',
        },
        "& a:hover": {
            backgroundColor: 'black',
            color: 'white',
        },
    }


    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    };
    return (
        <div className='main'>
            <Header />
            <div className="promotion-section">
            {/* <Carousel>
                <div>
                    <img src={petfood} />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src={petfood} />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src={petfood} />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel> */}
            </div>

            <div className="category-section">
                <h3>Categories</h3>
                <div className="category-list">
                    <Box  className="category" sx={boxStyle}>
                        <Link to="/productlist" sx={boxStyle}>
                            <div className="image-container">
                                <img src={petfood} alt="petfoodicon" ></img>
                            </div>
                            <p>Pet food</p>
                        </Link>
                    </Box>
                    <Box  className="category" sx={boxStyle}>
                        <Link to="/productlist" >
                            <div className="image-container">
                                <img src={petvit} alt="petvitaminsicon"></img>
                            </div>
                            <p>Pet supplement</p>
                        </Link>
                    </Box>
                    <Box  className="category" sx={boxStyle}>
                        <Link to="/productlist" >
                        <div className="image-container">
                            <img src={petaccessories} alt="petaccessoriesicon"></img>
                        </div>
                        <p>Pet accessories</p>
                        </Link>
                    </Box>
                    <Box  className="category" sx={boxStyle}>
                        <Link to="/productlist">
                        <div className="image-container">
                            <img src={petcage} alt="petcageicon"></img>
                        </div>
                        <p>Pet cage</p>
                        </Link>
                    </Box>
                    <Box  className="category" sx={boxStyle}>
                        <Link to="/productlist">
                        <div className="image-container">
                            <img src={petbowl} alt="petbowlsicon"></img>
                        </div>
                        <p>Pet feeders/bowls</p>
                        </Link>
                    </Box>
                    <Box  className="category" sx={boxStyle}>
                        <Link to="/productlist">
                        <div className="image-container">
                            <img src={pettreats} alt="pettreaticon"></img>
                        </div>
                        <p>Pet treats</p>
                        </Link>
                    </Box>
                </div>
            </div>

            <div className="feedback-section">
                <h3>Feedback</h3>
            </div>

            <div className="about-section">
                <h3>About</h3>
            </div>
            <Footer />
        </div>
    )
}

export default HomePage