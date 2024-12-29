import React from 'react';

const OrderCard = ({ order }) => {
    return (
        <div className="order-card">
            <h5>Items:</h5>
            <ul className="order-items-list">
                {order.items.map((item, index) => (
                    <li key={index} className="order-item">
                        <p>{item.productId.title}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: Rs. {item.price}</p>
                    </li>
                ))}
            </ul>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">
                        <p><strong>Total Amount:</strong> Rs. {order.totalAmount}</p>
                        <p><strong>Status:</strong> {order.paymentStatus}</p>
                    </div>
                    <div className="col-sm-6">
                        <p><strong>Shipping Address:</strong></p>
                        <div className="shipping-address">
                            <p>{order.shippingAddress.name}</p>
                            <p>{order.shippingAddress.locality}, {order.shippingAddress.city}</p>
                            <p>{order.shippingAddress.state}, {order.shippingAddress.zipcode}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default OrderCard;
