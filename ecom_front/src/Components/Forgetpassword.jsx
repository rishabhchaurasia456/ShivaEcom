import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

const Forgetpassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [stage, setStage] = useState(1);    // Track which stage the user is in (1: Email form, 2: OTP form, 3: Reset Password form)
    const [error, setError] = useState("");

    // Handle submitting the email form to request OTP
    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setError("Email is required");
            return;
        }

        try {
            // Send request to backend to generate and send OTP to the email
            const response = await axios.post(`${config.API_BASE_URL}/api/user/request_reset`, { email });

            // On success, move to the OTP stage
            if (response.status === 200) {
                setError("");
                setStage(2); // Move to the OTP stage after submitting email
            }
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.error || "Something went wrong");
        }
    };

    // Handle submitting OTP to verify it
    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!otp) {
            setError("OTP is required");
            return;
        }

        try {
            const response = await axios.post(`${config.API_BASE_URL}/api/user/forget_password`, {
                email,
                otp,
            });

            if (response.status === 200) {
                alert(response.data.message); // Show "OTP verified successfully!" message
                setStage(3); // Proceed to reset password stage
            }
        } catch (error) {
            console.error('Error during OTP submission:', error);
            setError(error.response?.data?.error || "Invalid OTP or expired OTP");
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!newPassword) {
            setError("New password is required");
            return;
        }

        try {
            const response = await axios.post(`${config.API_BASE_URL}/api/user/forget_password`, {
                email,
                otp,
                newPassword,
            });

            if (response.status === 200) {
                alert(response.data.message); // Show "Password reset successfully" message
                navigate('/user_login'); // Redirect to login page
            }
        } catch (error) {
            console.error('Error during password reset:', error);
            setError(error.response?.data?.error || "Something went wrong while resetting the password");
        }
    };

    return (
        <div>
            <div className="container mt-5 pt-5">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className='card p-5 m-5'>
                            <h1>Forget Password</h1>

                            {stage === 1 && (
                                <form onSubmit={handleEmailSubmit}>
                                    <input
                                        className="form-control my-3"
                                        type="email"
                                        value={email}
                                        placeholder="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {error && <p className="text-danger">{error}</p>}
                                    <button className="btn btn-primary" type="submit">
                                        Send OTP
                                    </button>
                                </form>
                            )}

                            {stage === 2 && (
                                <form onSubmit={handleOtpSubmit}>
                                    <input
                                        className="form-control my-3"
                                        type="text"
                                        value={otp}
                                        placeholder="Enter OTP"
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                    {error && <p className="text-danger">{error}</p>}
                                    <button className="btn btn-primary" type="submit">
                                        Verify OTP
                                    </button>
                                </form>
                            )}

                            {stage === 3 && (
                                <form onSubmit={handlePasswordSubmit}>
                                    <input
                                        className="form-control my-3"
                                        type="password"
                                        value={newPassword}
                                        placeholder="New Password"
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    {error && <p className="text-danger">{error}</p>}
                                    <button className="btn btn-success" type="submit">
                                        Reset Password
                                    </button>
                                </form>
                            )}

                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </div>
    );
};

export default Forgetpassword;

