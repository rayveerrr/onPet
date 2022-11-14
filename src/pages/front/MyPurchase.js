import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firebase-config'
import { getDocs, collection } from 'firebase/firestore'


// component
import Header from '../../components/frontend/Header'
import Sidebar from '../../components/frontend/Sidebar'

// Styles
import '../../styles/mypurchase.css'

// Image
import beefpro from '../../image/beefpro.jpg'
import profile from '../../image/user.png'

// Icon
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Paper, Divider, List, ListItemText } from '@mui/material'
import Footer from '../../components/frontend/Footer'
import useAuthentication from '../../hooks/auth/authenticate-user'

const style = {
    width: '100%',
    maxWidth: 360,
  };




  

function MyPurchase() {

    useAuthentication('User')

    const [orders, setOrders] = useState([]);

    const ordersCollectionRef = collection(db, "Orders")

    useEffect(() => {
        const getOrders = async () => {
        const data = await getDocs(ordersCollectionRef);
        setOrders(data.docs.map((doc) => ({...doc.data(),id: doc.id })).filter(cartItem => cartItem.Email === sessionStorage.getItem('email')))
        }
        getOrders();
    }, []);
  

    return (
    <div>
        <Header />
    <div className="main-content-container">
        <Sidebar />
        <div className="content-container">
            <Paper className="content-header" elevation={1}>
                    <Link to="#">All</Link>
                    <Link to="#">Order</Link>
                    <Link to="#">Completed</Link>
            </Paper>
            <div className="purchase-container">
            {orders.map((order) => {
                    return ( 
                <div className="purchase-border">
                    <div className="purchase-header">
                        <h4>Status: {order.Status} </h4>
                    </div>
                    <hr />
                    <div className="purchase">
                        <div className="img-container">
                            <img src={beefpro} alt="Product-image" />
                        </div>
                        <div className="product-details">
                            <h3>{order.ProdID}</h3>
                            <h4>{order.Quantity} </h4>
                        </div>
                        <hr />
                        <div className="price">
                            <p>{order.totalAmount}</p>
                        </div>
                    </div>
                    <hr />
                    <div className="total">
                        <p>Order Total: <span>P123.00</span></p>
                    </div>
                </div>
                );
            })} 
            </div>

            
        </div>
    </div>
    <Footer />
    </div>
  )
}

export default MyPurchase