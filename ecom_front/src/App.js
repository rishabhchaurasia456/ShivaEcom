import './App.css';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import UserLayout from './Layout/UserLayout';
import Home from './Pages/Home';
import AdminLayout from './Layout/AdminLayout';
import AdminDashboard from './AdminComponent/AdminDashboard';
import Product from './Pages/Product';
import ProductDetails from './Components/ProductDetails';
import AdminLogin from './AdminComponent/AdminLogin';
import MyListing from './AdminComponent/MyListing';
import NewListingForm from './AdminComponent/NewListingForm';
import EditProductdetails from './AdminComponent/EditProductdetails';
import UserLogin from './Components/UserLogin';
import UserRegister from './Components/UserRegister';
import Forgetpassword from './Components/Forgetpassword';
import Cart from './Components/Cart';
import MyAccount from './Components/MyAccount';
import Checkout from './Components/Checkout';
import Address from './Components/Address';
import User_Order from './Components/User_Order';
import AdminOrders from './AdminComponent/AdminOrders';

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const rawUserId = localStorage.getItem('userId');
      const userId = rawUserId?.replace(/^"|"$/g, '');

      if (!userId) return;

      try {
        const response = await axios.post(`http://localhost:8000/api/user/user_cart/${userId}`);
        setCart(response.data.cart.products || []);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={
            <UserLayout>
              <Home />
            </UserLayout>
          } />

          <Route path='/user_login' element={
            <UserLayout>
              <UserLogin />
            </UserLayout>
          } />

          <Route path='/user_register' element={
            <UserLayout>
              <UserRegister />
            </UserLayout>
          } />

          <Route path='/forget_pass' element={
            <UserLayout>
              <Forgetpassword />
            </UserLayout>
          } />

          <Route path='/product' element={
            <UserLayout>
              <Product />
            </UserLayout>
          } />

          <Route path='/user_acc' element={
            <UserLayout>
              <MyAccount />
            </UserLayout>
          } />

          <Route path='/address' element={
            <UserLayout>
              <Address />
            </UserLayout>
          } />

          <Route path='/orders' element={
            <UserLayout>
              <User_Order />
            </UserLayout>
          } />

          <Route path='/cart' element={
            <UserLayout>
              <Cart cart={cart} />
            </UserLayout>
          } />

          <Route path='/checkout' element={
            <UserLayout>
              <Checkout />
            </UserLayout>
          } />

          <Route path='/product_details/:id' element={
            <UserLayout>
              <ProductDetails cart={cart} setCart={setCart} />
            </UserLayout>
          } />

          <Route path='/admin' element={
            <>
              <AdminLogin />
            </>
          } />

          <Route path='/admin/dashboard' element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          } />

          <Route path='/admin/mylisting' element={
            <AdminLayout>
              <MyListing />
            </AdminLayout>
          } />

          <Route path='/admin/add_new_listing' element={
            <AdminLayout>
              <NewListingForm />
            </AdminLayout>
          } />

          <Route path='/admin/edit_listing/:id' element={
            <AdminLayout>
              {/* <NewListingForm isEditMode={true} /> */}
              <EditProductdetails />
            </AdminLayout>
          } />

          <Route path='/admin/myorders' element={
            <AdminLayout>
              <AdminOrders />
            </AdminLayout>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
