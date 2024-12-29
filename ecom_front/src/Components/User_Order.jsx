import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderCard from './OrderCard';

const User_Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const rawUserId = localStorage.getItem('userId'); 
  const userId = rawUserId?.replace(/^"|"$/g, '');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(`http://localhost:8000/api/user/user_orders/${userId}`);
        setOrders(response.data.orders);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders');
        setLoading(false);
        console.error(err);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  if (loading) {
    return <div className="loading-text">Loading...</div>;
  }

  if (error) {
    return <div className="error-text">{error}</div>;
  }

  return (
    <div className="container mt-5 pt-5">
      <h2 className="order-header">Your Orders</h2>
      {orders.length === 0 ? (
        <div className="no-orders">No orders found.</div>
      ) : (
        orders.map(order => <OrderCard key={order._id} order={order} />)
      )}
    </div>
  );
};

export default User_Order;
