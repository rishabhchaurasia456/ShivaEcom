import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import useLocation
import config from '../config';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Use the location hook to access the state
  const { cart, totalAmount } = location.state || {}; // Extract cart and totalAmount from state

  const [userDetails, setUserDetails] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const rawUserId = localStorage.getItem('userId'); // Fetch raw userId from local storage
  const userId = rawUserId?.replace(/^"|"$/g, ''); // Remove any surrounding quotes

  useEffect(() => {
    const getuserdetails = async () => {
      try {
        const response = await axios.post(`${config.API_BASE_URL}/api/user/get_user_details/${userId}`);
        setUserDetails(response.data.address);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    getuserdetails();
  }, [userId]);

  const handleAddressChange = (index) => {
    setSelectedAddress(index); // Set selected address index
  };

  const initiatePayment = async (event) => {
    event.preventDefault(); // Prevent form submission (page reload)

    if (selectedAddress === null) {
      alert("Please select a shipping address!");
      return;
    }

    try {
      // Call your backend to create an order and get the Razorpay order ID
      const response = await axios.post(`${config.API_BASE_URL}/api/user/payment/order_payment`, {
        amount: totalAmount * 100, // Amount in paise (Razorpay expects paise, not rupees)
        userId,
      });

      const { orderId, currency, razorpayKey } = response.data;

      // Initialize Razorpay with the order details
      const options = {
        key: razorpayKey, // Your Razorpay Key ID (from backend)
        amount: totalAmount * 100, // Amount in paise
        currency: currency,
        name: 'Your Store Name',
        description: 'Order Payment',
        order_id: orderId,

        handler: async function (paymentResponse) {
          // Handle payment success

          alert('Payment successful!');

          // Call the API to clear the cart after successful payment
          try {
            await axios.delete(`${config.API_BASE_URL}/api/user/clear_cart/${userId}`);

            // Clear the cart from localStorage
            localStorage.removeItem('cart');

            // Redirect to the Orders page
            navigate('/orders');
          } catch (error) {
            console.error('Error while clearing cart:', error);
            alert('Failed to clear cart.');
          }

          // Place the order after payment completion
          try {
            await axios.post(`${config.API_BASE_URL}/api/user/user_place_order`, {
              userId,
              orderId,
              cart,
              totalAmount,
              address: userDetails[selectedAddress],
              paymentResponse,
            });
          } catch (error) {
            console.error('Error while placing order:', error);
            alert('Failed to place order.');
          }
        },
        prefill: {
          name: userDetails[selectedAddress].name,
          email: userDetails[selectedAddress].email,
          contact: userDetails[selectedAddress].mobile,
        },
        theme: {
          color: '#F37254',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row mt-5 pt-5">
          <div className="col-sm-6 mt-5">
            <h4>Order Summary</h4>
            <div className="card mb-2">
              <div className="card-body">
                {cart && cart.map((item) => (
                  <div key={item.productId._id}>
                    <h5>{item.productId.title}</h5>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: Rs. {item.productId.price}</p>
                  </div>
                ))}
                <p className="ms-3 fw-bold">Total Cost = Rs. {totalAmount}</p>
              </div>
            </div>
            <small>Terms and Conditions...</small>
          </div>

          <div className="col-sm-4 offset-sm-1 mt-5">
            <div className="row">
              <h4 className='col-8'>Select Shipping Address</h4>
              <Link to="/address" className='col-4 btn btn-success'>Add address</Link>
            </div>
            <form onSubmit={initiatePayment}> {/* Use onSubmit to handle form submission */}
              {Array.isArray(userDetails) && userDetails.length > 0 ? (
                userDetails.map((item, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={`address-${index}`}
                      name="address"
                      checked={selectedAddress === index}
                      onChange={() => handleAddressChange(index)}
                    />
                    <label htmlFor={`address-${index}`} className="ms-2">Select this address</label>
                    <div className='card p-4 m-2'>
                      <div>Name: {item.name}</div>
                      <div>Mobile No: {item.mobile}</div>
                      <div>Locality: {item.locality}</div>
                      <div>City: {item.city}</div>
                      <div>State: {item.state}</div>
                      <div>Zipcode: {item.zipcode}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No addresses found.</div>
              )}
              <button type="submit" className="btn btn-warning mt-3 px-5 fw-bold" disabled={selectedAddress === null}>
                Continue Razor Pay
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
