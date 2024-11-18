import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const UserLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Use useNavigate for routing

    const login = async (e) => {
        e.preventDefault();
        console.log(email, password);

        // Prepare the login data
        const userData = {
            email,
            password,
        };

        try {
            // Send POST request to the backend using Axios
            const response = await axios.post("http://localhost:8000/api/user/get_user_login", userData);
            console.log(response)

            // Check if login was successful
            if (response.status === 200) {
                // If successful, store token in localStorage
                localStorage.setItem("token-info", JSON.stringify(response.data.token)); // Save token from response
                localStorage.setItem("userId", JSON.stringify(response.data.user._id)); // Save token from response
                setIsLoggedin(true);
                setEmail(""); // Clear the input fields
                setPassword("");
                setError(null); // Reset error message
                navigate("/"); // Redirect to the dashboard or home page
                window.location.reload();
            }
        } catch (err) {
            // Handle error response from backend
            console.error("Login error:", err);
            if (err.response) {
                // If response was received but with error status
                setError(err.response.data.message || "Login failed"); // Set error message from API
            } else {
                // If no response or network error
                setError("An error occurred while trying to log in.");
            }
            setIsLoggedin(false); // Ensure logged-in state is false if error occurs
        }
    };

    return (
        <div>
            <div className="container mt-5 pt-5">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className='card p-5 m-5'>
                            <h1>User login</h1>
                            {!isLoggedin ? (
                                <>
                                    <form onSubmit={login}> {/* Prevent default action with onSubmit */}
                                        <input
                                            className="form-control my-3"
                                            type="email"
                                            value={email}
                                            placeholder="Email"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <input
                                            className="form-control my-3"
                                            type="password"
                                            value={password}
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        {error && <p className="text-danger">{error}</p>} {/* Display error if any */}
                                        <button className="btn btn-success" type="submit">
                                            Login
                                        </button>
                                    </form>
                                    <div>
                                        <Link to="/user_register" className="nav-link text-center text-primary">
                                            New to SMM? Create an account
                                        </Link>
                                        <Link to="/forget_pass" className="nav-link text-center text-primary">
                                            Forget Password?
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h1>User is logged in</h1>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;
