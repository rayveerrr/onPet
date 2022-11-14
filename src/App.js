import React from 'react';
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import './App.css';
import Login from './pages/front/Login';
import SignUp from './pages/front/SignUp';
import HomePage from './pages/front/Homepage';
import ProductList from './pages/front/ProductList';
import SelectedProduct from './pages/front/SelectedProduct';
import Cart from './pages/front/Cart';
import MyAccount from './pages/front/MyAccount';
import MyPurchase from './pages/front/MyPurchase'
import Layout from './components/frontend/Sidebar';
import EditAdmin from './pages/back/EditAdmin';
import Orders from './pages/back/Orders';
import Supplies from './pages/back/Supplies';
import PetHistory from './pages/back/PetHistory';
import AddNewEmployee from './pages/back/AddNewEmployee';
import Transaction  from './pages/back/Transaction';
import Navbar from './components/Navbar';
import Admin from './pages/back/Admin';
import Feedback from './pages/front/Feedback';
import FBComment from './pages/back/FBComment';
import Checkout from './pages/front/Checkout';

function App() {
  return (
    <>
        <Routes>
            <Route path='/' element={<Navigate to='/homepage' />} />
            <Route path='/homepage' element={<HomePage/>} />
            <Route path='/productlist' element={<ProductList/>} />
            <Route path='/product/:id' element={<SelectedProduct />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/myaccount' element={<MyAccount />} />
            <Route path='/mypurchase' element={<MyPurchase />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/layout' element={<Layout/>} />
            <Route path='/feedback' element={<Feedback />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path= '/admin' element={<Admin />} >
              <Route path= '/admin/:id' element={<Navbar />} />
              <Route path='/admin/editAdmin' element={<EditAdmin />} />
              <Route path='/admin/orders' element={<Orders />} />
              <Route path='/admin/supplies' element={<Supplies />} />
              <Route path='/admin/petHistory' element={<PetHistory />} />
              <Route path='/admin/addnewemployee' element={<AddNewEmployee />} />
              <Route path='/admin/transactions' element={<Transaction />} />
              <Route path='/admin/fbcomment' element={<FBComment />} />
            </Route>
        </Routes>
    </>
  );
}

export default App;
