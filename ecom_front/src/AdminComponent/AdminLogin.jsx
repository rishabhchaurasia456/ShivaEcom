import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // To handle navigation

    const handleusername = (e) => setEmail(e.target.value);
    const handlepassword = (e) => setPassword(e.target.value);

    const submitLogin = async (e) => {
        e.preventDefault();
        const loginData = {
            username: email,
            password: password,
        };

        try {
            const response = await axios.post(`${config.API_BASE_URL}/api/admin/admin_login`, loginData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Check for a successful response
            if (response.status === 200) {
                console.log('Login successful:', response.data);

                // Redirect to /admin/dashboard
                navigate('/admin/dashboard');
            }
        } catch (err) {
            console.error('Error while Login:', err);
        }
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <h1 className='mt-5'>Admin Login</h1>
                        <div className="card p-5 mt-5">
                            <form onSubmit={submitLogin}>
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" className="form-control" onChange={handleusername} id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" onChange={handlepassword} id="password" placeholder="Password" />
                                </div>
                                <div className="form-group form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>

        </div>
    )
}

export default AdminLogin