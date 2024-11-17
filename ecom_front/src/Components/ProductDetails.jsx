import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const ProductDetails = ({ cart, setCart }) => {

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.post(`http://localhost:8000/api/user/get_products_details/${id}`);
                setProduct(response.data.getproductdetail);
                setSelectedImage(response.data.getproductdetail.images[0]);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [id]);

    const addToCart = async () => {
        const rawUserId = localStorage.getItem('userId'); // Fetch raw userId from local storage
        const userId = rawUserId?.replace(/^"|"$/g, ''); // Remove any surrounding quotes

        if (!userId) {
            console.error('User is not logged in.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/user/cart_item_add', {
                userId,
                productId: product._id,
            });
            console.log('Cart updated:', response.data);

            // Update the cart state in the parent component
            const updatedCartResponse = await axios.post(`http://localhost:8000/api/user/user_cart/${userId}`);
            setCart(updatedCartResponse.data.cart.products || []);
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };


    if (!product) {
        return <p>Product not found.</p>;
    }
    return (
        <div className="home-section mt-5 pt-5">
            <section className="padding-y">
                <div className="container">
                    <div className="row">
                        <aside className="col-lg-6">
                            <article className="gallery-wrap">
                                <div className="img-big-wrap img-thumbnail">
                                    <a data-fslightbox="mygallery" data-type="image" href={`http://localhost:8000/${selectedImage}`}>
                                        <img src={`http://localhost:8000/${selectedImage}`} id="productimg" height="560" width="100%" alt="Product" />
                                    </a>
                                </div>
                                <div className="thumbs-wrap d-flex">
                                    {product.images.map((img, index) => (
                                        <div key={index} className="me-2">
                                            <img
                                                src={`http://localhost:8000/${img}`}
                                                width="60"
                                                height="60"
                                                alt={`Product ${index + 1}`}
                                                style={{
                                                    cursor: 'pointer',
                                                    border: selectedImage === img ? '2px solid blue' : 'none',
                                                }}
                                                onClick={() => setSelectedImage(img)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </article>
                        </aside>
                        <main className="col-lg-6">
                            <article className="ps-lg-3">
                                <h4 className="title text-dark">{product.title} </h4>
                                <div className="rating-wrap my-3">
                                    <b className="label-rating text-warning fa fa-star"> 4.5 Rating</b>
                                </div>

                                <div className="mb-3">
                                    <var className="price h5">&#8377;{product.price}</var>
                                    <span className="text-decoration-line-through ms-2">&#8377;{product.mrp}</span>
                                </div>

                                <div className="mb-3">
                                    <h3>Description</h3>
                                    {product.desc}
                                </div>

                                <hr />

                                <Link to="#" className="btn btn-warning">Buy now</Link>&nbsp;&nbsp;&nbsp;
                                {cart.some((item) => item.productId._id === product._id) ? (
                                    <Link to="/cart" className="btn btn-success">Go to Cart</Link>
                                ) : (
                                    <button className="btn btn-primary" onClick={addToCart}>
                                        Add to Cart
                                    </button>
                                )}
                            </article>
                        </main>
                    </div>
                </div>
            </section>

            <section className="padding-y bg-light border-top">
                <div className="container">
                    <div className="row">
                        <aside className="col-lg-4">

                            {/* <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Similar items</h5>

                                    <article className="itemside mb-3">
                                        <a href="#" className="aside">
                                            <img src="assets/images/items/8.webp" width="96" height="96" className="img-md img-thumbnail" />
                                        </a>
                                        <div className="info">
                                            <a href="#" className="title mb-1"> Rucksack Backpack Large <br /> Line Mounts </a>
                                            <strong className="price"> $38.90</strong>
                                        </div>
                                    </article>

                                    <article className="itemside mb-3">
                                        <a href="#" className="aside">
                                            <img src="assets/images/items/9.webp" width="96" height="96" className="img-md img-thumbnail" />
                                        </a>
                                        <div className="info">
                                            <a href="#" className="title mb-1"> Summer New Men's Denim <br /> Jeans Shorts  </a>
                                            <strong className="price"> $29.50</strong>
                                        </div>
                                    </article>

                                    <article className="itemside mb-3">
                                        <a href="#" className="aside">
                                            <img src="assets/images/items/10.webp" width="96" height="96" className="img-md img-thumbnail" />
                                        </a>
                                        <div className="info">
                                            <a href="#" className="title mb-1"> T-shirts with multiple colors, for men and lady </a>
                                            <strong className="price"> $120.00</strong>
                                        </div>
                                    </article>

                                    <article className="itemside mb-3">
                                        <a href="#" className="aside">
                                            <img src="assets/images/items/11.webp" width="96" height="96" className="img-md img-thumbnail" />
                                        </a>
                                        <div className="info">
                                            <a href="#" className="title mb-1"> Blazer Suit Dress Jacket for Men, Blue color </a>
                                            <strong className="price"> $339.90</strong>
                                        </div>
                                    </article>

                                </div>
                            </div> */}

                        </aside>
                        <div className="col-lg-8">

                            <div className="card">
                                <header className="card-header">
                                    <ul className="nav nav-tabs card-header-tabs">
                                        <li className="nav-item">
                                            <Link to="#" data-bs-target="#tab_specs" data-bs-toggle="tab" className="nav-link active">Specification</Link>
                                        </li>
                                    </ul>
                                </header>
                                <div className="tab-content">
                                    <article id="tab_specs" className="tab-pane show active card-body">
                                        <p>With supporting text below as a natural lead-in to additional content. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
                                        <ul className="list-check cols-two">
                                            <li>Some great feature name here </li>
                                            <li>Lorem ipsum dolor sit amet, consectetur </li>
                                            <li>Duis aute irure dolor in reprehenderit </li>
                                            <li>Optical heart sensor </li>
                                            <li>Easy fast and ver good </li>
                                            <li>Some great feature name here </li>
                                            <li>Modern style and design</li>
                                        </ul>
                                        <table className="table border table-hover">
                                            <tr>
                                                <th>  Display: </th> <td> 13.3-inch LED-backlit display with IPS </td>
                                            </tr>
                                            <tr>
                                                <th>  Processor capacity: </th> <td> 2.3GHz dual-core Intel Core i5 </td>
                                            </tr>
                                            <tr>
                                                <th>  Camera quality: </th> <td>720p FaceTime HD camera  </td>
                                            </tr>
                                            <tr>
                                                <th>  Memory </th> <td> 8 GB RAM or 16 GB RAM </td>
                                            </tr>
                                            <tr>
                                                <th>  Graphics </th> <td> Intel Iris Plus Graphics 640 </td>
                                            </tr>
                                        </table>
                                    </article>
                                    <article id="tab_warranty" className="tab-pane card-body">
                                        Tab content or sample information now <br />
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    </article>
                                    <article id="tab_shipping" className="tab-pane card-body">
                                        Another tab content  or sample information now <br />
                                        Dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </article>
                                    <article id="tab_seller" className="tab-pane card-body">
                                        Some other tab content  or sample information now <br />
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                        cillum dolore eu fugiat nulla pariatur.  Excepteur sint occaecat cupidatat non
                                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </article>
                                </div>
                            </div>

                        </div>

                    </div>

                    <br /><br />

                </div>
            </section>


        </div>


    );
}



export default ProductDetails;
