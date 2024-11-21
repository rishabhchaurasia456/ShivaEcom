import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User_Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const rawUserId = localStorage.getItem('userId'); // Fetch raw userId from local storage
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5 pt-5">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <h4>Order #{order._id}</h4>
            <p><strong>Total Amount:</strong> Rs. {order.totalAmount}</p>
            <p><strong>Status:</strong> {order.paymentStatus}</p>
            <h5>Items:</h5>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  <p>{item.productId.title}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: Rs. {item.price}</p>
                </li>
              ))}
            </ul>
            <p><strong>Shipping Address:</strong></p>
            <p>{order.shippingAddress.name}</p>
            <p>{order.shippingAddress.locality}, {order.shippingAddress.city}</p>
            <p>{order.shippingAddress.state}, {order.shippingAddress.zipcode}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default User_Order;
