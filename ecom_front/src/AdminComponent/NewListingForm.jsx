import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    images: {
      image1: null,
      image2: null,
      image3: null,
      image4: null,
    },
  });

  const onInputChange = (e) => {
    const { name, value, type, files } = e.target;

    // Handle file input separately
    if (type === 'file') {
      const imageKey = name;
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        images: { ...prevData.images, [imageKey]: file }
      }));
    } else {
      // Update text inputs based on name attribute
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const submitProductData = async (e) => {
    e.preventDefault();

    const finalFormData = new FormData();

    // Append images
    Object.keys(formData.images).forEach((key) => {
      if (formData.images[key]) {
        finalFormData.append(key, formData.images[key]);
      }
    });

    // Append other form data
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
      const response = await axios.post('http://localhost:8000/api/admin/entry_products', finalFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        console.log('Listing Added successfully:', response.data);

        // Redirect to /admin/dashboard
        navigate('/admin/mylisting');
      }
      console.log('Data submitted:', response.data);
    } catch (err) {
      console.error('Error submitting data:', err);
    }
  };

  return (
    <div>
      <h1>Add New Listing</h1>
      <form onSubmit={submitProductData}>
        {/* Image inputs */}
        <input type="file" className="form-control" accept="image/*" name="image1" onChange={onInputChange} /><br />
        <input type="file" className="form-control" accept="image/*" name="image2" onChange={onInputChange} /><br />
        <input type="file" className="form-control" accept="image/*" name="image3" onChange={onInputChange} /><br />
        <input type="file" className="form-control" accept="image/*" name="image4" onChange={onInputChange} /><br />

        {/* Product fields */}
        <input type="text" className="form-control" placeholder="Title" name="title" value={formData.title} onChange={onInputChange} /><br />
        <input type="text" className="form-control" placeholder="MRP" name="mrp" value={formData.mrp} onChange={onInputChange} /><br />
        <input type="text" className="form-control" placeholder="Price" name="price" value={formData.price} onChange={onInputChange} /><br />
        {/* Stock fields */}
        <input type="text" className="form-control" placeholder="Stock Quantity" name="stockQuantity" value={formData.stockQuantity} onChange={onInputChange} /><br />
        {/* <input type="text" className="form-control" placeholder="Stock Status" name="listingStatus" value={formData.listingStatus} onChange={onInputChange} /><br /> */}

        <select className="form-control" name="listingStatus" onChange={onInputChange} value={formData.listingStatus}>
          <option value="">Select Status</option> {/* Default option */}
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select><br />
        <textarea className="form-control" placeholder="Description" name="desc" value={formData.desc} onChange={onInputChange} /><br />
        

        {/* Attributes */}
        <input type="text" className="form-control" placeholder="Color" name="color" value={formData.color} onChange={onInputChange} /><br />
        <input type="text" className="form-control" placeholder="Size" name="size" value={formData.size} onChange={onInputChange} /><br />

        {/* SKU and Category */}
        <input type="text" className="form-control" placeholder="SKU" name="sku" value={formData.sku} onChange={onInputChange} /><br />
        <input type="text" className="form-control" placeholder="Category" name="category" value={formData.category} onChange={onInputChange} /><br />

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default NewListingForm;

