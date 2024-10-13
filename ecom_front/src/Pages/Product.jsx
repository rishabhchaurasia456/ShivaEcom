import React, { useEffect, useState } from 'react';
import Card from '../Components/Card';
import axios from 'axios';

const Product = () => {
    const [products, setProducts] = useState([]);  // State to hold the products

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const resProduct = await axios.post("http://localhost:8000/api/user/get_products");
                console.log("Fetched products:", resProduct.data.getallproduct);
                setProducts(resProduct.data.getallproduct);  // Set the fetched products in state
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();  // Call the async function
    }, []);

    return (
        <div>
            <div className="container-fluid mt-5">
                <div className="row mt-5 pt-5">
                    {products.map((product) => (
                        <Card key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Product;
