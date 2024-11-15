import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
    const navigate = useNavigate();
    const [userFormData, setUserFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        password: '',
    });

    // const onInputChang = (e) => {
    //     const { name, mobile, email, password } = e.target;

    //     setUserFormData((prevData) => ({
    //         ...prevData,
    //         [name]: password,
    //       }));
    // }

    // const submitUserDat = async (e) => {
    //     e.preventDefault();

    //     const finaluserData = new UserData();

    //     finaluserData.append('name', userFormData.name);
    //     finaluserData.append('mobile', userFormData.mobile);
    //     finaluserData.append('email', userFormData.email);
    //     finaluserData.append('password', userFormData.password);

    // }

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setUserFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const submitUserData = async (e) => {
        e.preventDefault();
        console.log(userFormData);
        // You can now use userData to submit the registration form

        try {
            const response = await axios.post('http://localhost:8000/api/user/get_user_reg', userFormData);
            if (response.status === 201) {
                console.log('user added successfully:', response.data);
                navigate('/user_login');
            }

        } catch (err) {
            console.error('Error submitting data:', err);
        }

    };
    return (
        <div>
            <div className="container-fluid mt-5 pt-5">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <form onSubmit={submitUserData}>
                            <input className='form-control my-3' type="text" name="name" placeholder="Name" onChange={onInputChange} />
                            <input className='form-control my-3' type="number" name="mobile" placeholder="Mobile" onChange={onInputChange} />
                            <input className='form-control my-3' type="email" name="email" placeholder="Email" onChange={onInputChange} />
                            <input className='form-control my-3' type="password" name="password" placeholder="Password" onChange={onInputChange} />
                            <button className='btn btn-success' type="submit">Register</button>
                        </form>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </div>
    )
}

export default UserRegister