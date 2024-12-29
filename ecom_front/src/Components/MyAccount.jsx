import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MyAccount = () => {
  const [userDetails, setUserDetails] = useState(null); // Object instead of string to hold user info and address
  const rawUserId = localStorage.getItem('userId'); // Fetch raw userId from local storage
  const userId = rawUserId?.replace(/^"|"$/g, ''); // Remove any surrounding quotes

  useEffect(() => {
    const getuserdetails = async () => {
      try {
        const response = await axios.post(`http://localhost:8000/api/user/get_user_details/${userId}`);

        console.log("User Details:", response.data); // Check if data includes user details and address
        setUserDetails(response.data); // Assuming the response has both user info and address
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    getuserdetails();
  }, [userId]);

  return (
    <div>
      <div className="container">
        <div className="row mt-2">
          <div className="col-md-6 mt-5 p-5">
            <h2>My Details</h2>
            <div className="card p-4">
              {userDetails ? (
                <>
                  <div>Name: {userDetails.name}</div>
                  <div>Email Id: {userDetails.email}</div>
                  <div>Mobile No: {userDetails.mobile}</div>
                  <div>Password: {userDetails.password}</div>
                </>
              ) : (
                <div>Loading user details...</div>
              )}
            </div>
          </div>
          <div className="col-md-6 mt-5 p-5">
              <div className="row">
                <div className="col">
                  <h2>My Address</h2>
                </div>
                <div className="col">
                  <Link to="/address" className="btn btn-success float-end">Add Address</Link>
                </div>
              </div>
            <div>
              {userDetails && userDetails.address && Array.isArray(userDetails.address) && userDetails.address.length > 0 ? (
                userDetails.address.map((item, index) => (
                  <div className="card p-4 m-2" key={index}>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;