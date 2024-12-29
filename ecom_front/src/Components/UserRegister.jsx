import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
    const navigate = useNavigate();
    const [stage, setStage] = useState(1); // Stage 1: Registration, Stage 2: OTP verification
    const [userFormData, setUserFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        password: '',
    });
    const [otp, setOtp] = useState(''); // Stores OTP entered by the user
    const [error, setError] = useState('');

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setUserFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const submitUserData = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/user/get_user_reg', userFormData);
            if (response.status === 201) {
                setError('');
                setStage(2); // Move to OTP verification stage
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error registering user');
        }
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/user/verify_otp', {
                email: userFormData.email,
                otp,
            });
            if (response.status === 200) {
                setError('');
                alert('User registered successfully!');
                navigate('/user_login');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP');
        }
    };

    return (
        <div>
            <div className="container mt-5 pt-5">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="card p-5 m-5">
                            {stage === 1 && (
                                <form onSubmit={submitUserData}>
                                    <h1>Register</h1>
                                    <input className='form-control my-3' type="text" name="name" placeholder="Name" onChange={onInputChange} />
                                    <input className='form-control my-3' type="number" name="mobile" placeholder="Mobile" onChange={onInputChange} />
                                    <input className='form-control my-3' type="email" name="email" placeholder="Email" onChange={onInputChange} />
                                    <input className='form-control my-3' type="password" name="password" placeholder="Password" onChange={onInputChange} />
                                    {error && <p className="text-danger">{error}</p>}
                                    <button className='btn btn-success' type="submit">Register</button>
                                </form>
                            )}

                            {stage === 2 && (
                                <form onSubmit={verifyOtp}>
                                    <h1>Verify OTP</h1>
                                    <input className='form-control my-3' type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                                    {error && <p className="text-danger">{error}</p>}
                                    <button className='btn btn-primary' type="submit">Verify</button>
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

export default UserRegister;
