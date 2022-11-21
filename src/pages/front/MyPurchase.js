import React, { useState, useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
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
import { Paper, Divider, List, ListItemText, Typography } from '@mui/material'
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
        const orderNumber = data.OrderNumber;
        console.log(data.orderNumber)
        // get the order number so it will filter and create a table for the products that has the same ordernumber. will try fix this again tomorrow morning.
        console.log(data.docs.map((doc) => ({...doc.data(),id: doc.id })).filter(cartItem => (cartItem.Email === sessionStorage.getItem("email")) && (cartItem.OrderNumber === orderNumber )))
        setOrders(data.docs.map((doc) => ({...doc.data(),id: doc.id }))
        .filter(cartEmail => (cartEmail.Email === sessionStorage.getItem("email"))))
        }
        getOrders();
    }, []);

    const sumOfPrice = useMemo(() => {
        let totalAmount = 0;
        // fix mo to ver. kukunin mo yung order number lahat ng magkakaparehas na order number pag aaddin mo yung mga price tas ilagay sa total amount.
            orders.forEach(orderItem => totalAmount += orderItem.totalAmount)
            return totalAmount;
    }, [orders])

    const orderStatus = useMemo(() => {
        let Status = '';
        orders.forEach(ordersStatus => Status = ordersStatus.Status)
        return Status;
    }, [orders])
  

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
                        {orders.map((order) => {
                            return ( 
                            <>
                <div className="purchase-container">
                    <div className="purchase-border">
                        <div className="purchase-header" style={{diplay: 'flex', justifyContent: 'space-between'}}>
                            <h3> Order number: {order.OrderNumber}</h3>
                            <h4>Status: {orderStatus} </h4>
                        </div>
                                
                                <hr />
                                <div className="purchase">
                                    
                                    <div className="img-container">
                                        <img src={beefpro} alt="Product-image" />
                                    </div>
                                    {/* ilalagay ko yung price ng product */}
                                    <div className="product-details">
                                        <h3>{order.ProdName}</h3>
                                        <h4>Quantity: {order.Quantity} </h4>
                                    </div>
                                    <hr />
                                    <div className="price">
                                        <p>₱ {order.totalAmount.toLocaleString()}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="total">
                                    <p>Order Total: <span> ₱ {sumOfPrice.toLocaleString()}</span></p>
                                </div>
                        </div>
                    </div>
                            </>
                            );
                        })} 
                                
                </div>
            </div>
        <Footer />
    </div>
  )
}

export default MyPurchase