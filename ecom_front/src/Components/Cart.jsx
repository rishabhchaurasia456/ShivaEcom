// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const Cart = () => {
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const rawUserId = localStorage.getItem('userId'); // Fetch raw userId from local storage
//   const userId = rawUserId?.replace(/^"|"$/g, ''); // Remove any surrounding quotes

//   // Fetch cart data for the user
//   const fetchCart = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.post(`http://localhost:8000/api/user/user_cart/${userId}`);
//       setCart(response.data.cart.products || []);
//     } catch (error) {
//       console.error('Failed to fetch cart:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const baseURL = 'http://localhost:8000/'; // Update to your backend URL if needed

//   // Use the first image in the array if it exists
//   const imageUrl = cart.images && cart.images.length > 0
//     ? `${baseURL}${cart.images[0].replace(/\\/g, '/')}` // Correct file path format for URLs
//     : 'default-image.jpg'; // Fallback if no image

//   // Add product to cart
//   const handleAddToCart = async (productId) => {
//     try {
//       await axios.post('http://localhost:8000/api/user/cart_item_add', { userId, productId });
//       fetchCart(); // Refresh the cart after update
//     } catch (error) {
//       console.error('Failed to add product to cart:', error);
//     }
//   };

//   // Remove product from cart or decrease quantity
//   const handleRemoveFromCart = async (productId) => {
//     try {
//       await axios.post('http://localhost:8000/api/user/cart_item_remove', { userId, productId });
//       fetchCart(); // Refresh the cart after update
//     } catch (error) {
//       console.error('Failed to remove product from cart:', error);
//     }
//   };

//   const handleDeleteFromCart = async (productId) => {
//     try {
//       await axios.post('http://localhost:8000/api/user/cart_item_delete', { userId, productId });
//       fetchCart(); // Refresh the cart after update
//     } catch (error) {
//       console.error('Failed to remove product from cart:', error);
//     }
//   };

//   // Calculate total price
//   const calculateTotal = () =>
//     cart.reduce((total, item) => total + item.productId.price * item.quantity, 0);

//   useEffect(() => {
//     fetchCart();
//   }, [userId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <div className="container">
//         <div className="row">
//           <div className="container-fluid pt-3">
//             <h1 className="font_family text-danger opacity-50 text-center mt-5 py-4">My Shopping Cart</h1>
//             {cart.length === 0 ? (
//               <h3 className="text-center text-danger opacity-50 p-4" id="cartItem">
//                 Your cart is empty
//               </h3>
//             ) : (
//               <>
//                 <div className="border-top border-5 border-danger border-opacity-50">
//                   <div className="container cart_foot">
//                     <h3>Total</h3>
//                     <h2 id="total">Rs. {calculateTotal()}</h2>
//                   </div>
//                 </div>
//                 <div className="container my-3">
//                   <div className="row">
//                     <h1 className="text-center mb-5">Shopping Cart</h1>
//                     <div className="col-sm-8">
//                       {cart.map((item) => (
//                         <div className="card mb-3" key={item.productId._id}>
//                           <div className="card-body">
//                             <div className="row cart">
//                               <div className="col-sm-3 text-center align-self-center">
//                                 <img
//                                   src={imageUrl}
//                                   alt={item.productId.title}
//                                   className="img-fluid img-thumbnail shadow-sm"
//                                   height="150"
//                                   width="150"
//                                 />
//                               </div>
//                               <div className="col-sm-9">
//                                 <div>
//                                   <h5 className="font_family text-danger opacity-50">
//                                     {item.productId.title}
//                                   </h5>
//                                   <p className="mb-2 text-muted small">{item.productId.desc}</p>
//                                   <div className="my-3">
//                                     <label htmlFor="quantity">Quantity:</label>
//                                     <button
//                                       className="btn"
//                                       onClick={() => handleRemoveFromCart(item.productId._id)}
//                                     >
//                                       <i className="fa fa-minus"></i>
//                                     </button>
//                                     <span className="quantity">{item.quantity}</span>
//                                     <button
//                                       className="btn"
//                                       onClick={() => handleAddToCart(item.productId._id)}
//                                     >
//                                       <i className="fa fa-plus"></i>
//                                     </button>
//                                   </div>
//                                   <div className="d-flex justify-content-between">
//                                     <button
//                                       className="btn btn-sm btn-danger mr-3"
//                                       onClick={() => handleDeleteFromCart(item.productId._id)}
//                                     >
//                                       Remove item
//                                     </button>
//                                     <p className="mb-0 font_family text-danger opacity-50">
//                                       <strong>Rs. {item.productId.price * item.quantity}</strong>
//                                     </p>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="col-sm-4">
//                       <div className="card">
//                         <div className="card-body">
//                           <h3 className="font_family text-danger opacity-50">The Total Amount of</h3>
//                           <ul className="list-group">
//                             <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
//                               Amount<span>Rs. {calculateTotal()}</span>
//                             </li>
//                             <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
//                               Shipping<span>Rs. 70.00</span>
//                             </li>
//                             <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
//                               <div>
//                                 <strong className="font_family text-danger opacity-50">
//                                   Total
//                                 </strong>{' '}
//                                 <small>(including VAT)</small>
//                               </div>
//                               <span>
//                                 <strong className="font_family text-danger opacity-50">
//                                   Rs. {calculateTotal() + 70}
//                                 </strong>
//                               </span>
//                             </li>
//                           </ul>
//                           <div className="d-grid">
//                             <Link
//                               to="/checkout"
//                               state={{ cart, totalAmount: calculateTotal() + 70 }} // Pass cart and total amount as state
//                               className="btn btn-primary"
//                             >
//                               Place Order
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;


import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const rawUserId = localStorage.getItem('userId'); // Fetch raw userId from local storage
  const userId = rawUserId?.replace(/^"|"$/g, ''); // Remove any surrounding quotes

  // Fetch cart data for the user
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`http://localhost:8000/api/user/user_cart/${userId}`);
      setCart(response.data.cart.products || []);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const baseURL = 'http://localhost:8000/'; // Update to your backend URL if needed

  // Add product to cart
  const handleAddToCart = async (productId) => {
    try {
      await axios.post('http://localhost:8000/api/user/cart_item_add', { userId, productId });
      fetchCart(); // Refresh the cart after update
    } catch (error) {
      console.error('Failed to add product to cart:', error);
    }
  };

  // Remove product from cart or decrease quantity
  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.post('http://localhost:8000/api/user/cart_item_remove', { userId, productId });
      fetchCart(); // Refresh the cart after update
    } catch (error) {
      console.error('Failed to remove product from cart:', error);
    }
  };

  const handleDeleteFromCart = async (productId) => {
    try {
      await axios.post('http://localhost:8000/api/user/cart_item_delete', { userId, productId });
      fetchCart(); // Refresh the cart after update
    } catch (error) {
      console.error('Failed to remove product from cart:', error);
    }
  };

  // Calculate total price
  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.productId.price * item.quantity, 0);

  useEffect(() => {
    fetchCart();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="container-fluid pt-3">
            <h1 className="font_family text-danger opacity-50 text-center mt-5 py-4">My Shopping Cart</h1>
            {cart.length === 0 ? (
              <h3 className="text-center text-danger opacity-50 p-4" id="cartItem">
                Your cart is empty
              </h3>
            ) : (
              <>
                <div className="border-top border-5 border-danger border-opacity-50">
                  <div className="container cart_foot">
                    <h3>Total</h3>
                    <h2 id="total">Rs. {calculateTotal()}</h2>
                  </div>
                </div>
                <div className="container my-3">
                  <div className="row">
                    <h1 className="text-center mb-5">Shopping Cart</h1>
                    <div className="col-sm-8">
                      {cart.map((item) => {
                        // For each cart item, use the product's images array
                        const imageUrl = item.productId.images && item.productId.images.length > 0
                          ? `${baseURL}${item.productId.images[0].replace(/\\/g, '/')}` // Correct file path format
                          : 'default-image.jpg'; // Fallback if no image

                        return (
                          <div className="card mb-3" key={item.productId._id}>
                            <div className="card-body">
                              <div className="row cart">
                                <div className="col-sm-3 text-center align-self-center">
                                  <img
                                    src={imageUrl}
                                    alt={item.productId.title}
                                    className="img-fluid img-thumbnail shadow-sm"
                                    height="150"
                                    width="150"
                                  />
                                </div>
                                <div className="col-sm-9">
                                  <div>
                                    <h5 className="font_family text-danger opacity-50">
                                      {item.productId.title}
                                    </h5>
                                    <p className="mb-2 text-muted small">{item.productId.desc}</p>
                                    <div className="my-3">
                                      <label htmlFor="quantity">Quantity:</label>
                                      <button
                                        className="btn"
                                        onClick={() => handleRemoveFromCart(item.productId._id)}
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                      <span className="quantity">{item.quantity}</span>
                                      <button
                                        className="btn"
                                        onClick={() => handleAddToCart(item.productId._id)}
                                      >
                                        <i className="fa fa-plus"></i>
                                      </button>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <button
                                        className="btn btn-sm btn-danger mr-3"
                                        onClick={() => handleDeleteFromCart(item.productId._id)}
                                      >
                                        Remove item
                                      </button>
                                      <p className="mb-0 font_family text-danger opacity-50">
                                        <strong>Rs. {item.productId.price * item.quantity}</strong>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="col-sm-4">
                      <div className="card">
                        <div className="card-body">
                          <h3 className="font_family text-danger opacity-50">The Total Amount of</h3>
                          <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                              Amount<span>Rs. {calculateTotal()}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                              Shipping<span>Rs. 70.00</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                              <div>
                                <strong className="font_family text-danger opacity-50">
                                  Total
                                </strong>{' '}
                                <small>(including VAT)</small>
                              </div>
                              <span>
                                <strong className="font_family text-danger opacity-50">
                                  Rs. {calculateTotal() + 70}
                                </strong>
                              </span>
                            </li>
                          </ul>
                          <div className="d-grid">
                            <Link
                              to="/checkout"
                              state={{ cart, totalAmount: calculateTotal() + 70 }} // Pass cart and total amount as state
                              className="btn btn-primary"
                            >
                              Place Order
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
