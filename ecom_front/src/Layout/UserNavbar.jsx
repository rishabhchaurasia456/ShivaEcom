import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import user from "../images/avatar.png";
import cart from "../images/shopping-bag.png";

const UserNavbar = () => {
  const [clicked, setClicked] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in by verifying if a token exists in localStorage
  const isLogin = localStorage.getItem("token-info") !== null; // Check if token is in localStorage

  const logout = () => {
    localStorage.removeItem("token-info");
    localStorage.removeItem("userId");
    window.location.reload();
    navigate("/");
  };

  // Function to handle menu click
  const handleClick = () => {
    setClicked(!clicked);
  };

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  // Google Translate Init function
  // const googleTranslateElementInit = () => {
  //   // Check if the google translate object is available
  //   if (window.google && window.google.translate && window.google.translate.TranslateElement) {
  //     new window.google.translate.TranslateElement(
  //       {
  //         pageLanguage: "en",
  //         autoDisplay: false,
  //       },
  //       "google_translate_element"
  //     );
  //   } else {
  //     console.error("Google Translate API is not loaded yet.");
  //   }
  // };

  // useEffect(() => {
  //   // Check if the script is already present to avoid duplication
  //   if (!document.querySelector("[src='//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit']")) {
  //     const addScript = document.createElement("script");
  //     addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  //     addScript.async = true;

  //     // Add an event listener to run the init function once the script is loaded
  //     addScript.onload = () => {
  //       setTimeout(() => {
  //         googleTranslateElementInit();
  //       }, 10); // Delay initialization by 2 seconds
  //     };


  //     addScript.onerror = () => {
  //       console.error("Failed to load the Google Translate script.");
  //     };

  //     document.body.appendChild(addScript);
  //   } else {
  //     // If the script is already present, directly call the init function
  //     googleTranslateElementInit();
  //   }
  // }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <nav>
            <div className="logo">
              <h3>
                <Link to="/" className="nav-link">
                  Shiva Mega Mart
                </Link>
              </h3>
            </div>
            <div>
              <ul id="navbar" className={clicked ? "#navbar active" : "#navbar"}>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/product">Product</Link>
                </li>
                <li>
                  <Link to="#">About us</Link>
                </li>
                <li>
                  <Link to="#">Contact us</Link>
                </li>
              </ul>
            </div>
            {/* This is where the Google Translate select box will appear */}
            {/* <span>
                select : 
            <div id="google_translate_element" style={{ display: "inline-block" }}></div>
            </span> */}
            <div className="float-end">
              {isLogin ? (
                <div style={{ position: "relative", display: "inline-block" }}>
                  {/* User Icon */}
                  <img
                    src={user}
                    width="35"
                    alt="user"
                    onClick={toggleDropdown} // Toggle dropdown on click
                    style={{ cursor: "pointer" }}
                  />
                  {/* Dropdown Menu */}
                  {dropdownVisible && (
                    <div
                      style={{
                        position: "absolute",
                        top: "45px",
                        right: "0",
                        backgroundColor: "white",
                        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                        borderRadius: "5px",
                        zIndex: 10,
                      }}
                    >
                      <ul style={{ listStyleType: "none", margin: 0, padding: "10px" }}>
                        <li>
                          <Link to="/user_acc" className="dropdown-item">
                            My Account
                          </Link>
                        </li>
                        <li>
                          <Link to="/orders" className="dropdown-item">
                            My Orders
                          </Link>
                        </li>
                        <li>
                          <Link onClick={logout} className="dropdown-item">
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {/* Cart Icon */}
                  <Link to="/cart">
                    <img src={cart} width="35" alt="cart" />
                  </Link>
                </div>
              ) : (
                // Display Login button if not logged in
                <Link to="/user_login" className="btn btn-dark rounded-pill px-4">
                  Login
                </Link>
              )}
            </div>
            <div id="mobile" onClick={handleClick}>
              <i id="bar" className={clicked ? "fa fa-times" : "fa fa-bars"}></i>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
