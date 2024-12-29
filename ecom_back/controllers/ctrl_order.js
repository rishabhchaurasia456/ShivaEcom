const Order = require('../models/order');
const User = require('../models/user');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email provider's service (e.g., 'gmail', 'sendgrid', etc.)
  auth: {
    user: 'rishabhchaurasia456@gmail.com', // Your email address
    pass: 'qlhx mxrm qrfw jpjt', // Your email password or app-specific password
  },
});

const sendOrderConfirmationEmail = (userEmail, orderId) => {
  const mailOptions = {
    from: 'rishabhchaurasia456@gmail.com',
    to: userEmail,
    subject: `Order Confirmation - Order #${orderId}`,
    text: `Dear Customer,

    Thank you for your order! Your order with ID #${orderId} has been placed successfully. We are processing it and will send you an update shortly.

    Best regards,
    Your Company Name`,
    html: `<p>Dear Customer,</p>
           <p>Thank you for your order! Your order with ID <strong>#${orderId}</strong> has been placed successfully. We are processing it and will send you an update shortly.</p>
           <p>Best regards,<br>Shiva Mega Mart</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Order confirmation email sent:', info.response);
    }
  });
};

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

    // Fetch the user to get the email
    const user = await User.findById(userId); // Fetch user by userId
    if (user) {
      sendOrderConfirmationEmail(user.email, Order._id); // Send the confirmation email
    }

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

const ctrl_Orders_get = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email') // Populates user details
      .populate('items.productId', 'name price images title'); // Populates product details including images

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

const ctrl_Orders_status = async (req, res) => {
  const { orderIds, status } = req.body;

  if (!orderIds || !status) {
    return res.status(400).json({ message: 'Order IDs and status are required.' });
  }

  try {
    // Update the status for the selected orders
    await Order.updateMany(
      { _id: { $in: orderIds } },
      { $set: { status } }
    );

    res.status(200).json({ message: 'Order status updated successfully.' });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Internal Server Error.' });
  }
}

module.exports = {
  ctrl_user_order_placed,
  ctrl_get_UserOrders,
  ctrl_Orders_get,
  ctrl_Orders_status
}