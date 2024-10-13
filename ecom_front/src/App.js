import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import UserLayout from './Layout/UserLayout';
import Home from './Pages/Home';
import AdminLayout from './Layout/AdminLayout';
import AdminDashboard from './AdminComponent/AdminDashboard';
import Product from './Pages/Product';
import ProductDetails from './Components/ProductDetails';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={
            <UserLayout>
              <Home />
            </UserLayout>
          } />

          <Route path='/product' element={
            <UserLayout>
              <Product />
            </UserLayout>
          } />

          <Route path='/product_details/:id' element={
            <UserLayout>
              <ProductDetails />
            </UserLayout>
          } />

          <Route path='/admin' element={
            <AdminLayout>
              <AdminDashboard/>
            </AdminLayout>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
