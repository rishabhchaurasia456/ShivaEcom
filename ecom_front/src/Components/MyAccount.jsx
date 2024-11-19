import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const MyAccount = () => {

  const [userDetails, setUserDetails] = useState("")

  const rawUserId = localStorage.getItem('userId'); // Fetch raw userId from local storage
  const userId = rawUserId?.replace(/^"|"$/g, ''); // Remove any surrounding quotes

  useEffect(() => {
    const getuserdetails = async () => {
      try {
        const response = await axios.post(`http://localhost:8000/api/user/get_user_details/${userId}`);

        console.log("ccccccccccccccccccccc", response.data.address);
        setUserDetails(response.data.address)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getuserdetails();
  }, []);


  return (
    <div>
      <div className="container">
        <div className="row mt-2">
          <div className="col-md-6 mt-5 p-5">
            <h2>My Details</h2>
            <div className="card p-4">
              <div>Name</div>
              <div>Email Id</div>
              <div>Mobile NO</div>
              <div>Password</div>
            </div>
          </div>
          <div className="col-md-6 mt-5 p-5">
            <h2>My Address</h2>
            <Link to="/address" className='btn btn-success float-end' >Add Address</Link>
            <div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyAccount