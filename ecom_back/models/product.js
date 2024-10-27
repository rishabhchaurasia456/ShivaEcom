const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        images: {
            type: [String], // Array of image paths (URLs)
            required: true
        },
        sku: {
            type: String,
            required: true,
            unique: true,    // Enforcing the uniqueness of SKU
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
        listingStatus: {
            type: String,
            required: true,
        },
        stock: {
            quantity: {
            type: Number,
            required: true
            },
            // status: {
            // type: String,
            // required: true
            // }
        },
        desc: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true
        },
        reviews: [
            {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            rating: {
                type: Number,
                required: true
            },
            comment: String,
            date: {
                type: Date,
                default: Date.now
            }
            }
        ],
        attributes: {
            color: String,
            size: String,
            weight: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        isActive: {
            type: Boolean,
            default: true
        },
    }, { collection: 'Product' });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
