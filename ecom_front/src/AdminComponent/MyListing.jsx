import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

const MyListing = () => {
    const [listing, setListing] = useState([]);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const resProduct = await axios.post(`${config.API_BASE_URL}/api/admin/get_products`);
                const allproduct = resProduct.data.getallproduct
                setListing(allproduct);  // Set the fetched products in state
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchListing();
    }, []);

    const baseURL = `${config.API_BASE_URL}/`;

    return (
        <div>
            <div className='container-fluid'>
                <div className="row">
                    <div className="col">
                        <h2>My Listings</h2>
                    </div>
                    <div className="col">
                        <Link to="/admin/add_new_listing" className='btn btn-primary float-end'>ADD Listing</Link>
                    </div>
                </div>
            </div>

            <div className="card p-2 m-2">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product Details</th>
                            <th>Sku ID</th>
                            <th>Listing Price</th>
                            <th>Mrp</th>
                            <th>Stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(listing) && listing.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <span>
                                        {/* Check if images array exists and the first image is available */}
                                        {item.images && item.images[0] ? (
                                            <>
                                                <img
                                                    src={`${baseURL}${item.images[0].replace(/\\/g, '/')}`}
                                                    alt="Product"
                                                    style={{ width: '50px', marginRight: '10px' }}
                                                />
                                            </>
                                        ) : (
                                            <img
                                                src="/path/to/default-image.jpg"
                                                alt="prod"
                                                style={{ width: '50px', marginRight: '10px' }}
                                            />
                                        )}
                                    </span>
                                    {item.title}
                                </td>
                                <td>{item.sku}</td>
                                <td>{item.price}</td>
                                <td>{item.mrp}</td>
                                <td>
                                    {item.stock?.quantity !== undefined ? `${item.stock.quantity} units` : 'No stock info'}
                                    <br />
                                    <span className="text-danger">
                                        {item.stock?.quantity === 0 ? 'Out of stock' : ''}
                                    </span>
                                </td>
                                <td>
                                    <Link className='btn btn-primary' to={`/admin/edit_listing/${item._id}`}>Edit</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyListing;
