import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [formData, setFormData] = useState({
    title: '',
    mrp: '',
    price: '',
    desc: '',
    listingStatus: '',
    stockQuantity: '',
    color: '',
    size: '',
    sku: '',
    category: '',
    existingImages: [], // Track existing images separately
    newImages: [] // Track new images separately
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // To handle navigation

  // Fetch product details when component mounts
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axios.post(`http://localhost:8000/api/admin/get_products_details/${id}`);
        const product = res.data.getproductdetail;

        if (product) {
          setFormData({
            title: product.title,
            mrp: product.mrp,
            price: product.price,
            desc: product.desc,
            listingStatus: product.listingStatus,
            stockQuantity: product.stock.quantity,
            color: product.attributes.color,
            size: product.attributes.size,
            sku: product.sku,
            category: product.category,
            existingImages: product.images || [], // Keep track of existing images from server
            newImages: [] // New images array starts empty
          });
        } else {
          setError('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Error fetching product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Handle form input changes dynamically
  const onInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      const selectedImages = Array.from(files); // Converts FileList to array
      setFormData((prevData) => ({
        ...prevData,
        newImages: [...prevData.newImages, ...selectedImages] // Append new images to the newImages array
      }));
    } else {
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
  
    // Append existing images as their paths/URLs (not as files)
    formData.existingImages.forEach((image) => {
      updatedFormData.append('existingImages[]', image);  // Notice `existingImages[]` to keep it as an array
    });
  
    // Append new images as files
    formData.newImages.forEach((file) => {
      updatedFormData.append('newImages[]', file);  // Notice `newImages[]` to keep it as an array
    });
  
    // Append other product fields
    updatedFormData.append('title', formData.title);
    updatedFormData.append('mrp', formData.mrp);
    updatedFormData.append('price', formData.price);
    updatedFormData.append('desc', formData.desc);
    updatedFormData.append('listingStatus', formData.listingStatus);
    updatedFormData.append('stockQuantity', formData.stockQuantity);
    updatedFormData.append('color', formData.color);
    updatedFormData.append('size', formData.size);
    updatedFormData.append('sku', formData.sku);
    updatedFormData.append('category', formData.category);
  
    try {
      const response = await axios.put(`http://localhost:8000/api/admin/update_product/${id}`, updatedFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        console.log('Product updated:', response.data);
        navigate('/admin/mylisting');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
  
  // Handle image removal (for both existing and new images)
  const handleRemoveImage = (indexToRemove, isNewImage = false) => {
    if (isNewImage) {
      setFormData((prevData) => ({
        ...prevData,
        newImages: prevData.newImages.filter((_, index) => index !== indexToRemove) // Remove new image
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        existingImages: prevData.existingImages.filter((_, index) => index !== indexToRemove) // Remove existing image
      }));
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
          <h3>Existing Images:</h3>
          {formData.existingImages.map((image, index) => (
            <div key={index} className="mb-2">
              <img
                src={`http://localhost:8000/${image}`}
                alt={`editimg ${index + 1}`}
                style={{ width: '100px', height: '100px', marginRight: '10px' }}
              />
              <button type="button" onClick={() => handleRemoveImage(index)}>Remove</button>
            </div>
          ))}
        </div>

        {/* Display new images to be uploaded */}
        <div className="mb-3">
          <h3>New Images:</h3>
          {formData.newImages.map((image, index) => (
            <div key={index} className="mb-2">
              <img
                src={URL.createObjectURL(image)}
                alt={`newimg ${index + 1}`}
                style={{ width: '100px', height: '100px', marginRight: '10px' }}
              />
              <button type="button" onClick={() => handleRemoveImage(index, true)}>Remove</button>
            </div>
          ))}
        </div>

        {/* Image upload field for adding more images */}
        <div>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            multiple // Allow multiple image uploads
            name="images"
            onChange={onInputChange}
          />
        </div><br />

        {/* Form fields for other product details */}
        <input type="text" className="form-control" placeholder="Title" name="title" value={formData.title} onChange={onInputChange} /><br />
        <input type="text" className="form-control" placeholder="MRP" name="mrp" value={formData.mrp} onChange={onInputChange} /><br />
        <input type="text" className="form-control" placeholder="Price" name="price" value={formData.price} onChange={onInputChange} /><br />
        <textarea className="form-control" placeholder="Description" name="desc" value={formData.desc} onChange={onInputChange} /><br />

        {/* Stock and other fields */}
        <input type="text" className="form-control" placeholder="Stock Quantity" name="stockQuantity" value={formData.stockQuantity} onChange={onInputChange} /><br />
        <select className="form-control" name="listingStatus" onChange={onInputChange} value={formData.listingStatus}>
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select><br />

        <input type="text" className="form-control" placeholder="Color" name="color" value={formData.color} onChange={onInputChange} /><br />
        <input type="text" className="form-control" placeholder="Size" name="size" value={formData.size} onChange={onInputChange} /><br />
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

export default EditProductDetails;
