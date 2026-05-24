// import React, { useEffect, useState } from 'react';
// import Card from '../Components/Card';
// import axios from 'axios';
// import FilterSiderbar from '../Components/FilterSiderbar';
// import config from '../config';

// const Product = () => {
//     const [products, setProducts] = useState([]);  // State to hold the products

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const resProduct = await axios.post(`${config.API_BASE_URL}/api/user/get_products`);
//                 console.log("Fetched products:", resProduct.data.getallproduct);
//                 setProducts(resProduct.data.getallproduct);  // Set the fetched products in state
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//             }
//         };

//         fetchProducts();  // Call the async function
//     }, []);

//     return (
//         <div>
//         <div className="container-fluid">
//             <div className="row">
//                 <div className="col-md-3">
//                     filter
//                     <FilterSiderbar/>
//                 </div>
//                 <div className="col-md-9">
//                     <div className="container-fluid mt-5">
//                         <div className="row mt-5 pt-5">
//                             {products.map((product) => (
//                                 <Card key={product._id} product={product} />
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </div>
//     );
// }

// export default Product;


import React, { useEffect, useState } from 'react';
import Card from '../Components/Card';
import axios from 'axios';
import FilterSiderbar from '../Components/FilterSiderbar';
import config from '../config';

const Product = () => {
    const [products, setProducts] = useState([]);  // State to hold the products
    const [range, setRange] = useState([]);  // Price range filter
    const [selectedCategory, setSelectedCategory] = useState('');  // Category filter
    const [selectedSize, setSelectedSize] = useState('');  // Size filter

    console.log("selectedCategoryyyyyyyyyyyyyyyy", selectedCategory)
    //   useEffect(() => {
    //     const fetchProducts = async () => {
    //       try {
    //         const resProduct = await axios.post(`${config.API_BASE_URL}/api/user/get_products`, {
    //           priceRange: range,
    //           category: selectedCategory,
    //           size: selectedSize,
    //         });
    //         console.log("Fetched products:", resProduct.data.getallproduct);
    //         setProducts(resProduct.data.getallproduct);  // Set the fetched products in state
    //       } catch (error) {
    //         console.error("Error fetching products:", error);
    //       }
    //     };

    //     fetchProducts();  // Call the async function
    //   }, [range, selectedCategory, selectedSize]);  // Re-fetch when filters change

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Log the filter values being sent to the backend
                console.log("Filters being sent to backend:", {
                    priceRange: range,
                    category: selectedCategory,
                    size: selectedSize,
                });

                // Send the filters in the request body
                const resProduct = await axios.post(`${config.API_BASE_URL}/api/user/get_products`, {
                    priceRange: range,
                    category: selectedCategory,
                    size: selectedSize,
                });

                // Log the fetched products
                console.log("Fetched products:", resProduct.data.getallproduct);

                setProducts(resProduct.data.getallproduct);  // Set the fetched products in state
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();  // Call the async function to fetch products whenever filters change
    }, [range, selectedCategory, selectedSize]);  // Re-fetch when filters change

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 mt-5">
                        {/* Filter Sidebar */}
                        <FilterSiderbar
                            range={range}
                            setRange={setRange}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            selectedSize={selectedSize}
                            setSelectedSize={setSelectedSize}
                        />
                    </div>
                    <div className="col-md-9">
                        <div className="container-fluid mt-5">
                            <div className="row mt-5 pt-5">
                                {products.map((product) => (
                                    <Card key={product._id} product={product} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
