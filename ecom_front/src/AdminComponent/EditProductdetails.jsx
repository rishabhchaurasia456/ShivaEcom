import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProductdetails = () => {
  const { id } = useParams();  // Get the product ID from the URL
  const [formData, setFormData] = useState({
    title: '',
    mrp: '',
    price: '',
    desc: '',
    listingStatus: '',
    stockQuantity: '',
    // stockStatus: '',
    color: '',
    size: '',
    sku: '',
    category: '',
    images: {
      image1: null,
      image2: null,
      image3: null,
      image4: null,
    }
  });
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const navigate = useNavigate(); // To handle navigation

  // Fetch product details when component mounts
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axios.post(`http://localhost:8000/api/admin/get_products_details/${id}`);
        const product = res.data.getproductdetail;  // Access product details from `getproductdetail`

        if (product) {
          // Set the formData with product details
          setFormData({
            title: product.title,
            mrp: product.mrp,
            price: product.price,
            desc: product.desc,
            listingStatus: product.listingStatus,
            stockQuantity: product.stock.quantity,
            // stockStatus: product.stock.status,
            color: product.attributes.color,
            size: product.attributes.size,
            sku: product.sku,
            category: product.category,
            images: {
              image1: product.images[0] || null,
              image2: product.images[1] || null,
              image3: product.images[2] || null,
              image4: product.images[3] || null,
            }
          });
        } else {
          setError("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Error fetching product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  console.log("formdata", formData)

  // Handle form input changes dynamically using the `name` attribute
  const onInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      // For image fields
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        images: {
          ...prevData.images,
          [name]: file
        }
      }));
    } else {
      // For text fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  // Submit form data for editing
  const submitProductData = async (e) => {
    e.preventDefault();

    const updatedFormData = new FormData();

    // Append individual images to formData if they exist
    Object.keys(formData.images).forEach((key) => {
      if (formData.images[key]) {
        updatedFormData.append(key, formData.images[key]);
      }
    });

    // Append other product fields
    updatedFormData.append('title', formData.title);
    updatedFormData.append('mrp', formData.mrp);
    updatedFormData.append('price', formData.price);
    updatedFormData.append('desc', formData.desc);
    updatedFormData.append('listingStatus', formData.listingStatus);
    updatedFormData.append('stockQuantity', formData.stockQuantity);
    // updatedFormData.append('stockStatus', formData.stockStatus);
    updatedFormData.append('color', formData.color);
    updatedFormData.append('size', formData.size);
    updatedFormData.append('sku', formData.sku);
    updatedFormData.append('category', formData.category);

    try {
      // Update existing product using PUT instead of POST
      const response = await axios.put(`http://localhost:8000/api/admin/update_product/${id}`, updatedFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        console.log('updated successful:', response.data);

        // Redirect to /admin/dashboard
        navigate('/admin/mylisting');
    }
      console.log('Product updated:', response.data);
    } catch (err) {
      console.error('Error submitting data:', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={submitProductData}>
        {/* Display existing images */}
        <div className="mb-3">
          {Object.keys(formData.images).map((key, index) => (
            formData.images[key] && (
              <div key={index} className="mb-2">
                <img
                  src={`http://localhost:8000/${formData.images[key]}`}
                  alt={`editimg ${index + 1}`}
                  style={{ width: '100px', height: '100px', marginRight: '10px' }}
                />
              </div>
            )
          ))}
        </div>

        {/* Four image upload fields */}
        {Object.keys(formData.images).map((key, index) => (
          <div key={index}>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              name={key}  // Use the key as the name for the image fields
              onChange={onInputChange}
            />
            <br />
          </div>
        ))}

        {/* Title, MRP, Price, and Description fields */}
        <input type="text" className="form-control" placeholder="Title" name="title" value={formData.title} onChange={onInputChange} /><br />
        <input type="text" className="form-control" placeholder="MRP" name="mrp" value={formData.mrp} onChange={onInputChange} /><br />
        <input type="text" className="form-control" placeholder="Price" name="price" value={formData.price} onChange={onInputChange} /><br />
        <textarea className="form-control" placeholder="Description" name="desc" value={formData.desc} onChange={onInputChange} /><br />

        {/* Stock fields */}
        <input type="text" className="form-control" placeholder="Stock Quantity" name="stockQuantity" value={formData.stockQuantity} onChange={onInputChange} /><br />
        {/* <input type="text" className="form-control" placeholder="Stock Status" name="stockStatus" value={formData.stockStatus} onChange={onInputChange} /><br /> */}
        <select className="form-control" name="listingStatus" onChange={onInputChange} value={formData.listingStatus}>
          <option value="">Select Status</option> {/* Default option */}
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select><br />

        {/* Attributes */}
        <input type="text" className="form-control" placeholder="Color" name="color" value={formData.color} onChange={onInputChange} /><br />
        <input type="text" className="form-control" placeholder="Size" name="size" value={formData.size} onChange={onInputChange} /><br />

        {/* SKU and Category */}
        <input type="text" className="form-control" placeholder="SKU" name="sku" value={formData.sku} onChange={onInputChange} /><br />
        <input type="text" className="form-control" placeholder="Category" name="category" value={formData.category} onChange={onInputChange} /><br />
        
        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductdetails;
