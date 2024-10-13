const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    images: {
        type: [String], // Array of image paths (URLs)
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    mrp: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
}, { collection: 'Product' });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
