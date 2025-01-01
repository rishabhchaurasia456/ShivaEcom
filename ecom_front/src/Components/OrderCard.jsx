import React, { useState } from 'react';
import config from '../config';
import axios from 'axios';

const OrderCard = ({ order }) => {
    // State to store review information for each product
    const [reviews, setReviews] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false); // State to handle submission status

    const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage

    // Function to handle changes in the review input fields
    const handleReviewChange = (productId, field, value) => {
        setReviews(prevReviews => ({
            ...prevReviews,
            [productId]: {
                ...prevReviews[productId],
                [field]: value,
            }
        }));
    };

    // Function to handle review submission
    const handleReviewSubmit = async (productId) => {
        const review = reviews[productId];

        // Basic validation
        if (!review || !review.rating || !review.comment) {
            alert('Please provide a rating and a comment.');
            return;
        }

        // Ensure rating is a valid number
        const rating = Number(review.rating);
        if (isNaN(rating) || rating < 1 || rating > 5) {
            alert('Rating must be between 1 and 5.');
            return;
        }

        const cleanUserId = userId.replace(/"/g, '');
        const reviewData = {
            productId: productId,
            userId: cleanUserId,  // userId from localStorage
            rating: rating,
            comment: review.comment,
        };

        // Show loading indicator while submitting
        setIsSubmitting(true);

        try {
            // Sending review to the backend
            const response = await axios.post(`${config.API_BASE_URL}/api/user/reviews`, reviewData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Check if the response status is 200 (successful)
            if (response.status === 200) {
                alert('Review submitted successfully!');
                // Optionally reset the form state
                setReviews(prevReviews => ({
                    ...prevReviews,
                    [productId]: { rating: '', comment: '' } // Resetting the review form for that product
                }));
            } else {
                alert(`Error: ${response.data.message || 'Something went wrong'}`);
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('An error occurred while submitting your review.');
        } finally {
            // Hide loading indicator after submission attempt
            setIsSubmitting(false);
        }
    };

    return (
        <div className="order-card">
            <ul className="order-items-list">
                {order.items.map((item, index) => (
                    <li key={index} className="order-item">
                        <div className="row">
                            <div className="col-md-2 col-sm-4">
                                <img
                                    src={`${config.API_BASE_URL}/${item.productId.images[0].replace(/\\/g, '/')}`}
                                    width="150px"
                                    alt={item.productId.title}
                                />
                            </div>
                            <div className="col-md-10 col-sm-8">
                                <p>{item.productId.title}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: Rs. {item.price}</p>

                                {/* Review Section */}
                                <div className="review-section">
                                    <h5>Leave a Review</h5>
                                    <div className="rating">
                                        <label>Rating:</label>
                                        <select
                                            value={reviews[item.productId._id]?.rating || ''}
                                            onChange={(e) => handleReviewChange(item.productId._id, 'rating', e.target.value)}
                                        >
                                            <option value="">Select rating</option>
                                            <option value="1">1 Star</option>
                                            <option value="2">2 Stars</option>
                                            <option value="3">3 Stars</option>
                                            <option value="4">4 Stars</option>
                                            <option value="5">5 Stars</option>
                                        </select>
                                    </div>
                                    <div className="comment">
                                        <label>Comment:</label>
                                        <textarea
                                            rows="3"
                                            placeholder="Write your review..."
                                            value={reviews[item.productId._id]?.comment || ''}
                                            onChange={(e) => handleReviewChange(item.productId._id, 'comment', e.target.value)}
                                        />
                                    </div>
                                    <button
                                        onClick={() => handleReviewSubmit(item.productId._id)}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">
                        <p><strong>Total Amount:</strong> Rs. {order.totalAmount}</p>
                        <p><strong>Status:</strong> {order.paymentStatus}</p>
                    </div>
                    <div className="col-sm-6">
                        <p><strong>Shipping Address:</strong></p>
                        <div className="shipping-address">
                            <p>{order.shippingAddress.name}</p>
                            <p>{order.shippingAddress.locality}, {order.shippingAddress.city}</p>
                            <p>{order.shippingAddress.state}, {order.shippingAddress.zipcode}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
