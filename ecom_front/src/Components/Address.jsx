import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Address = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [locality, setLocality] = useState('');
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [state, setState] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const rawUserId = localStorage.getItem('userId'); // Fetch raw userId from local storage
        const userId = rawUserId?.replace(/^"|"$/g, '');
        // Form data object
        const formData = {
            userId,
            name,
            mobile,
            locality,
            city,
            zipcode,
            state,
        };

        try {
            // Make a POST request to your API
            const response = await axios.post('http://localhost:8000/api/user/add_user_address', formData);

            const result = await response.json();

            // Handle success and error messages
            if (response.ok) {
                setResponseMessage('Address added successfully!');
                // Reset the form fields
                setName('');
                setMobile('');
                setLocality('');
                setCity('');
                setZipcode('');
                setState('');
                navigate("/checkout")
            } else {
                setResponseMessage(result.message || 'An error occurred.');
            }
        } catch (error) {
            console.error("Error occurred:", error);
            setResponseMessage('An error occurred while submitting the form.');
        }
    };

    return (
        <div className="container mt-5 pt-5">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <h1>Add Address</h1>
                    <div className="card p-5">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Mobile:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="mobileno"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="locality">Locality:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="locality"
                                    value={locality}
                                    onChange={(e) => setLocality(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="zipcode">Zipcode:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="zipcode"
                                    value={zipcode}
                                    onChange={(e) => setZipcode(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="state">State:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="state"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className='btn btn-success'>Add Address</button>
                        </form>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
            {responseMessage && (
                <div className="response-message">{responseMessage}</div>
            )}
        </div>
    );
};

export default Address;
