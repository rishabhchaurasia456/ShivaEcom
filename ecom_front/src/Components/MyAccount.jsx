import React from 'react'

const MyAccount = () => {
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
            <div className="card p-4">
              <div>Name</div>
              <div>Email Id</div>
              <div>Mobile NO</div>
              <div>Password</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyAccount