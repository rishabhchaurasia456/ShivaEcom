// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  }],
  totalAmount: { type: Number, required: true },
  shippingAddress: {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    locality: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true },
  },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  paymentDetails: {
    razorpayPaymentId: String,
    razorpayOrderId: String,
    razorpaySignature: String,
  },
  status: { type: String, enum: ['Pending', 'Handover'], default: 'Pending' }, // Add status field
}, { timestamps: true, collection: 'Order' });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
