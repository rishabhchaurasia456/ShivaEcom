const Order = require('../models/order');
// const axios = require('axios');

const ctrl_user_order_placed = async (req, res) => {
  const { userId, orderId, cart, totalAmount, address, paymentResponse } = req.body;

  try {
    const order = new Order({
      userId,
      items: cart.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      })),
      totalAmount,
      shippingAddress: address,
      paymentStatus: 'completed',
      paymentDetails: {
        razorpayPaymentId: paymentResponse.razorpay_payment_id,
        razorpayOrderId: paymentResponse.razorpay_order_id,
        razorpaySignature: paymentResponse.razorpay_signature,
      },
    });

    await order.save();

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error placing order' });
  }
};

const ctrl_get_UserOrders = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        // Fetch the orders based on the userId
        const orders = await Order.find({ userId }).populate('items.productId');
        
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        res.status(200).json({ orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

module.exports = {
    ctrl_user_order_placed,
    ctrl_get_UserOrders
}