import React from 'react';
import { Link } from 'react-router-dom'
import config from '../config';

const Card = ({ product }) => {
  // Use the first image in the array if it exists
  const imageUrl = product.images && product.images.length > 0
    ? `${config.API_BASE_URL}/${product.images[0].replace(/\\/g, '/')}` // Correct file path format for URLs
    : 'default-image.jpg'; // Fallback if no image

  return (
    <div className="col-md-3 col-sm-4 col-6">
      <Link to={`/product_details/${product._id}`} className='nav-link'>
        <div className="product_card p-3">
          <img
            src={imageUrl}
            className="product_card_img"
            alt={product.title || 'Product image'}
            width="100%"
          />
          <div className="product_card_body">
            <p className="product_card_title">{product.title}</p>
            <p className="product_card_price">
              <b>&#8377;{product.price}</b>
              <span className="text-decoration-line-through ms-2">&#8377;{product.mrp}</span>
            </p>
            <p className="product_card_last">
              <span className="fa fa-star product_card_star" /> {product.rating || 'N/A'}
              <span className="product_card_pack">{product.pack || 'Pack of 1'}</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;
