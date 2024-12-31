import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

const NewListingForm = () => {
  const navigate = useNavigate(); // To handle navigation
  const [formData, setFormData] = useState({
    title: '',
    mrp: '',
    price: '',
    desc: '',
    stockQuantity: '',
    listingStatus: '',
    color: '',
    size: '',
    sku: '',
    category: '',
    images: [], // Store images dynamically in an array
  });

  // Handling dynamic image inputs
  const onAddImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, null] // Add new image placeholder
    }));
  };

  const onInputChange = (e) => {
    const { name, value, type, files } = e.target;

    // Handle file input
    if (type === 'file') {
      const index = name.split('_')[1]; // Get the index of the image input
      const file = files[0];

      setFormData((prevData) => {
        const newImages = [...prevData.images];
        newImages[index] = file;
        return { ...prevData, images: newImages };
      });
    } else {
      // Handle text inputs
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const submitProductData = async (e) => {
    e.preventDefault();

    const finalFormData = new FormData();

    // Append images dynamically
    formData.images.forEach((file, index) => {
      if (file) {
        finalFormData.append(`image${index + 1}`, file);
      }
    });

    // Append other form data (ensure all fields are added correctly)
    finalFormData.append('title', formData.title);
    finalFormData.append('mrp', formData.mrp);
    finalFormData.append('price', formData.price);
    finalFormData.append('desc', formData.desc);
    finalFormData.append('stockQuantity', formData.stockQuantity);
    finalFormData.append('listingStatus', formData.listingStatus);
    finalFormData.append('color', formData.color);
    finalFormData.append('size', formData.size);
    finalFormData.append('sku', formData.sku);
    finalFormData.append('category', formData.category);

    try {
      // Inspect the FormData before sending
      for (let pair of finalFormData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const response = await axios.post(`${config.API_BASE_URL}/api/admin/entry_products`, finalFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        console.log('Listing added successfully:', response.data);
        navigate('/admin/mylisting');
      }
    } catch (err) {
      console.error('Error submitting data:', err);
    }
  };

  return (
    <div>
      <h1>Add New Listing</h1>
      <form onSubmit={submitProductData}>
        {/* Dynamic Image Inputs */}
        {formData.images.map((_, index) => (
          <div key={index}>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              name={`image_${index}`}
              onChange={onInputChange}
            />
            <br />
          </div>
        ))}
        <button type="button" className="btn btn-secondary" onClick={onAddImage}>
          Add More Images
        </button>

        {/* Product fields */}
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          name="title"
          value={formData.title}
          onChange={onInputChange}
        /><br />

        <input
          type="text"
          className="form-control"
          placeholder="MRP"
          name="mrp"
          value={formData.mrp}
          onChange={onInputChange}
        /><br />

        <input
          type="text"
          className="form-control"
          placeholder="Price"
          name="price"
          value={formData.price}
          onChange={onInputChange}
        /><br />
        
        <input
          type="text"
          className="form-control"
          placeholder="Quantity"
          name="stockQuantity"
          value={formData.stockQuantity}
          onChange={onInputChange}
        /><br />

        <select
          className="form-control"
          name="listingStatus"
          onChange={onInputChange}
          value={formData.listingStatus}
        >
          <option value="">Select Listing Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select><br />

        <textarea
          className="form-control"
          placeholder="Description"
          name="desc"
          value={formData.desc}
          onChange={onInputChange}
        /><br />

        <input
          type="text"
          className="form-control"
          placeholder="Color"
          name="color"
          value={formData.color}
          onChange={onInputChange}
        /><br />

        <input
          type="text"
          className="form-control"
          placeholder="Size"
          name="size"
          value={formData.size}
          onChange={onInputChange}
        /><br />

        <input type="text" className="form-control" placeholder="SKU" name="sku" value={formData.sku} onChange={onInputChange} /><br />
        <input type="text" className="form-control" placeholder="Category" name="category" value={formData.category} onChange={onInputChange} /><br />


        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewListingForm;
