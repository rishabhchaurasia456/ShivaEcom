import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
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
            <>
              <AdminLogin/>
            </>
          } />

          <Route path='/admin/dashboard' element={
            <AdminLayout>
              <AdminDashboard/>
            </AdminLayout>
          } />

          <Route path='/admin/mylisting' element={
            <AdminLayout>
              <MyListing/>
            </AdminLayout>
          } />

          <Route path='/admin/add_new_listing' element={
            <AdminLayout>
              <NewListingForm/>
            </AdminLayout>
          } />

          <Route path='/admin/edit_listing/:id' element={
            <AdminLayout>
              {/* <NewListingForm/> */}
              {/* <NewListingForm isEditMode={true} /> */}
              <EditProductdetails/>
            </AdminLayout>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
