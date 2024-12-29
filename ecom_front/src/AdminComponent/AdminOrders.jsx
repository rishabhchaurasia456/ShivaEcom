import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [currentTab, setCurrentTab] = useState('Pending');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/admin/get_orders');
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const handleSelectOrder = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const generateLabelsAndMoveToHandover = async () => {
    const doc = new jsPDF();

    selectedOrders.forEach((orderId, index) => {
      const order = orders.find(o => o._id === orderId);

      if (order) {
        if (index > 0) doc.addPage();

        doc.setFontSize(14);
        doc.text(`Shipping Label for Order: ${order._id}`, 10, 10);

        doc.setFontSize(12);
        doc.text(`User: ${order.userId.name} (${order.userId.email})`, 10, 20);

        doc.text('Shipping Address:', 10, 30);
        doc.text(
          `${order.shippingAddress.name}, 
          ${order.shippingAddress.locality}, 
          ${order.shippingAddress.city}, 
          ${order.shippingAddress.state} - ${order.shippingAddress.zipcode}`,
          10,
          40
        );

        doc.text('Items:', 10, 60);
        order.items.forEach((item, itemIndex) => {
          doc.text(
            `${itemIndex + 1}. ${item.productId.title} - ${item.quantity} x $${item.productId.price}`,
            10,
            70 + itemIndex * 10
          );
        });
      }
    });

    doc.save('Selected_Orders_Labels.pdf');

    try {
      await axios.post('http://localhost:8000/api/admin/update_order_status', {
        orderIds: selectedOrders,
        status: 'Handover',
      });

      await fetchOrders();
      setSelectedOrders([]);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const filteredOrders = orders.filter(order => order.status === currentTab);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <h2>Admin Orders</h2>

        <div className="tabs">
          <button
            className={`btn ${currentTab === 'Pending' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setCurrentTab('Pending')}
          >
            Pending
          </button>&nbsp;
          <button
            className={`btn ${currentTab === 'Handover' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setCurrentTab('Handover')}
          >
            Handover
          </button>
        </div>

        {filteredOrders.length === 0 ? (
          <p>No {currentTab.toLowerCase()} orders found.</p>
        ) : (
          <>
            {currentTab === 'Pending' && (
              <button
                className="btn btn-primary my-2"
                onClick={generateLabelsAndMoveToHandover}
                disabled={selectedOrders.length === 0}
              >
                Generate Labels and Move to Handover
              </button>
            )}
            <table className="table">
              <thead>
                <tr>
                  {currentTab === 'Pending' && <th>Select</th>}
                  <th>Order ID</th>
                  <th>Items</th>
                  <th>Total Amount</th>
                  <th>User</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order._id}>
                    {currentTab === 'Pending' && (
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order._id)}
                          onChange={() => handleSelectOrder(order._id)}
                        />
                      </td>
                    )}
                    <td>{order._id}</td>
                    <td>
                      {order.items.map((item, index) => (
                        <div key={index}>
                          <div className="row">
                            <td className="col-8">
                              {item.productId.images && item.productId.images[0] && (
                                <img
                                  src={`http://localhost:8000/${item.productId.images[0].replace(/\\/g, '/')}`}
                                  alt="Product"
                                  style={{ width: '50px', marginRight: '10px' }}
                                />
                              )}
                              {item.productId.title}
                            </td>
                            <td className='col-4'>
                              - {item.productId.price} x {item.quantity}
                            </td>
                          </div>
                        </div>
                      ))}
                    </td>
                    <td>${order.totalAmount}</td>
                    <td>{order.userId.name}</td>
                    <td>{order.paymentStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;

