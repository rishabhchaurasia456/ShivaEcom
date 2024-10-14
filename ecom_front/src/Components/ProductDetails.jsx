import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {

    const { id } = useParams()
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.post(`http://localhost:8000/api/user/get_products_details/${id}`);
                setProduct(response.data.getproductdetail); 
                console.log("sssssssssssssssssssssssssss", response)
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [id]);


    if (!product) {
        return <p>Product not found.</p>;
    }
    return (
        <div>
            <div className="container mt-5 pt-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <img src={`http://localhost:8000/${product.images[0]}`} id="productimg" width="100%" alt="Product" />
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="small-img_row">
                                        {product.images.map((img, index) => (
                                            <div key={index} className="">
                                                <img src={`http://localhost:8000/${img}`} className="small-img" width="100%" alt={`Product ${index + 1}`} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 p-4">
                        <h1 className="font_family">{product.title}</h1>
                        <h2 className="font_family text-danger opacity-50">${product.price}</h2>
                        <p>{product.desc}</p>
                        <a href="/cart/" className="btn btn-dark rounded-pill px-4 mx-2">Buy Now</a>
                        <button className="btn btn-outline-dark rounded-pill px-4 mx-2">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
