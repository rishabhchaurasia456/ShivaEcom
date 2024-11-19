// import React, { useEffect, useState } from 'react'
// import axios from 'axios';

// const Checkout = () => {

//     const [userDetails, setUserDetails] = useState("")

//     const rawUserId = localStorage.getItem('userId'); // Fetch raw userId from local storage
//     const userId = rawUserId?.replace(/^"|"$/g, ''); // Remove any surrounding quotes

//     useEffect(() => {
//         const getuserdetails = async () => {
//             try {
//                 const response = await axios.post(`http://localhost:8000/api/user/get_user_details/${userId}`);

//                 console.log("ccccccccccccccccccccc", response.data.address);
//                 setUserDetails(response.data.address)
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//             }
//         };

//         getuserdetails();
//     }, []);

//     return (
//         <div>
//             <div className="container">
//                 <div className="row mt-5 pt-5">
//                     <div className="col-sm-6 mt-5">
//                         <h4>Order Summary</h4>
//                         <div className="card mb-2">
//                             <div className="card-body">
//                                 <h5>Product: stencils</h5>
//                                 <p>Quantity: 4</p>
//                                 <p className="fw-bold">Price: 199</p>
//                             </div>

//                             <p className="ms-3 fw-bold">Total Cost = 199</p>


//                             <div className="form-group">
//                                 <label for="amount" className="m-3 fw-bold">Amount :</label>
//                                 <input type="number" name="amount" id="amount" className="border-0" value="{{totalamount}}" readonly />
//                             </div>

//                         </div>
//                         <small>Term and Condition: Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, ullam saepe! Iure optio repellat dolor velit, minus rem. Facilis cumque neque numquam laboriosam, accusantium adipisci nisi nihil in et quis?</small>
//                     </div>

//                     <div className="col-sm-4 offset-sm-1 mt-5">
//                         <h4>Select Shipping Address</h4>
//                         <form action="/paymentdone/" method="POST">
//                             <div>
//                                 {Array.isArray(userDetails) && userDetails.length > 0 ? (
//                                     userDetails.map((item, index) => (
//                                         <div className='card p-4 m-2' key={index}>
//                                             <div>Name: {item.name}</div>
//                                             <div>Mobile No: {item.mobile}</div>
//                                             <div>Locality: {item.locality}</div>
//                                             <div>City: {item.city}</div>
//                                             <div>State: {item.state}</div>
//                                             <div>Zipcode: {item.zipcode}</div>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <div>No addresses found.</div>
//                                 )}
//                             </div>

//                             <div className="form-check mt-2 mb-5">
//                                 <input className="form-check-input" type="radio" name="custid" id="custadd{{forloop.counter}}" value="{{add.id}}" />
//                                 <label className="form-check-label fw-bold" for="">
//                                     Address: c block </label>
//                             </div>
//                             <div id="add_message"></div>
//                             <div className="text-end">
//                                 <button type="submit" id="rzp-button1" className="btn btn-warning mt-3 px-5 fw-bold">Continue Razor Pay</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Checkout




import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation

const Checkout = () => {
  const location = useLocation(); // Use the location hook to access the state
  const { cart, totalAmount } = location.state || {}; // Extract cart and totalAmount from state

  const [userDetails, setUserDetails] = useState("");
  const rawUserId = localStorage.getItem('userId'); // Fetch raw userId from local storage
  const userId = rawUserId?.replace(/^"|"$/g, ''); // Remove any surrounding quotes

  useEffect(() => {
    const getuserdetails = async () => {
      try {
        const response = await axios.post(`http://localhost:8000/api/user/get_user_details/${userId}`);
        setUserDetails(response.data.address);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    getuserdetails();
  }, [userId]);

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
            <h4>Select Shipping Address</h4>
            <form>
              {Array.isArray(userDetails) && userDetails.length > 0 ? (
                userDetails.map((item, index) => (
                  <div className='card p-4 m-2' key={index}>
                    <div>Name: {item.name}</div>
                    <div>Mobile No: {item.mobile}</div>
                    <div>Locality: {item.locality}</div>
                    <div>City: {item.city}</div>
                    <div>State: {item.state}</div>
                    <div>Zipcode: {item.zipcode}</div>
                  </div>
                ))
              ) : (
                <div>No addresses found.</div>
              )}
              <button type="submit" className="btn btn-warning mt-3 px-5 fw-bold">Continue Razor Pay</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
