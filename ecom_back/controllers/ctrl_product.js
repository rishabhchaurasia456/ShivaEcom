const Product = require('../models/product');
// const { param } = require('../routes/user_routes.js');

// Create Product Controller
const ctrl_Product_entry = async (req, res) => {
    try {
        // Collect all image file paths in an array
        const images = [];
        if (req.files) {
            for (let key in req.files) {
                if (req.files[key]) {
                    req.files[key].forEach((file) => {
                        images.push(file.path);
                    });
                }
            }
        }

        const { title, mrp, price, desc } = req.body;

        const newProduct = new Product({
            images: images, // Store all images in an array
            title,
            mrp,
            price,
            desc,
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const ctrl_Product_get = async (req, res) => {
    try {
        const getallproduct = await Product.find()
        res.status(200).json({message: "Product fetch successfully", getallproduct})
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

const ctrl_Product_details = async (req, res) => {
    try {
        const _id = req.params.id; // Correctly access the product ID from URL
        const getproductdetail = await Product.findById(_id); // Use findById instead of find
        if (!getproductdetail) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: "Product fetched successfully", getproductdetail });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { 
    ctrl_Product_entry, 
    ctrl_Product_get, 
    ctrl_Product_details
 };
