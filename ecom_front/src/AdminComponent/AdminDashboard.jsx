import React, { useState } from 'react'; 
import axios from 'axios';

const AdminDashboard = () => {
  // Update state to handle four separate images
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  
  const [title, setTitle] = useState('');
  const [mrp, setMrp] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');  // Use `desc` instead of `description`

  // Handle file input changes for each image field
  const onInputChange = (e, imageKey) => {
    const file = e.target.files[0];  // Only single file per input
    setImages((prevState) => ({ ...prevState, [imageKey]: file }));
  };

  // Handle text inputs
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleMrpChange = (e) => setMrp(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleDescChange = (e) => setDesc(e.target.value);  // Handle description

  // Submit form data
  const submitProductData = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append individual images to formData if they exist
    Object.keys(images).forEach((key) => {
      if (images[key]) {
        formData.append(key, images[key]);
      }
    });

    // Append other product fields
    formData.append('title', title);
    formData.append('mrp', mrp);
    formData.append('price', price);
    formData.append('desc', desc);  // Use `desc` field

    try {
      const response = await axios.post('http://localhost:8000/api/admin/entry_products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Data submitted:', response.data);
    } catch (err) {
      console.error('Error submitting data:', err);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <form onSubmit={submitProductData}>
        {/* Four image upload fields */}
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={(e) => onInputChange(e, 'image1')}
        />
        <br />
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={(e) => onInputChange(e, 'image2')}
        />
        <br />
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={(e) => onInputChange(e, 'image3')}
        />
        <br />
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={(e) => onInputChange(e, 'image4')}
        />
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="MRP"
          value={mrp}
          onChange={handleMrpChange}
        />
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Price"
          value={price}
          onChange={handlePriceChange}
        />
        <br />
        <textarea
          className="form-control"
          placeholder="Description"
          value={desc}  // Use `desc` here
          onChange={handleDescChange}
        />
        <br />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
