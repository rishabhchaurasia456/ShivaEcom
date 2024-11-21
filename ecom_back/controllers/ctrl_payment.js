const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: 'rzp_test_SghTCnoJVHXVO5',
    key_secret: 'VyVf2kQ1KM004ENt9Ech4y07',
  });

const ctrl_user_payment = async (req, res) => {
    const { amount, userId } = req.body; // The total amount should be in paise (1 Rs = 100 paise)

    try {
        const options = {
            amount: amount, // in paise
            currency: 'INR',
            receipt: `receipt_${userId}`,
            payment_capture: 1, // auto capture after payment
        };

        const order = await razorpay.orders.create(options);
        res.json({
            orderId: order.id,
            currency: order.currency,
            razorpayKey: 'rzp_test_SghTCnoJVHXVO5', // Your Razorpay key ID
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).send('Error creating order');
    }
};

module.exports = {
    ctrl_user_payment
}