import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
import user from "../images/avatar.png"
import cart from "../images/shopping-bag.png"

const UserNavbar = () => {

    const [clicked, setClicked] = useState(false);

    // Function to handle menu click
    const handleClick = () => {
        setClicked(!clicked); // Toggle the clicked state
    };
    
    return (
        <div>
            <div className='container-fluid'>
                <div className="row">
                    <nav>
                        <div className='logo'>
                            <h3><Link to="/" className='nav-link'>Shiva Mega Mart</Link></h3>
                        </div>
                        <div>
                            <ul id="navbar" className={clicked ? "#navbar active" : "#navbar"}>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/product">Product</Link></li>
                                <li><Link to="/feature">Feature</Link></li>
                                <li><Link to="/feature">About us</Link></li>
                                <li><Link to="/feature">Contact us</Link></li>
                            </ul>
                        </div>
                        <div className='float-end'>
                            <Link to="#"><img src={user} width="35" alt="user" /></Link>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Link to="#"><img src={cart} width="35" alt="cart" /></Link>&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        <div id="mobile" onClick={handleClick}>
                            <i id='bar' className={clicked ? 'fa fa-times' : 'fa fa-bars'}></i>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default UserNavbar