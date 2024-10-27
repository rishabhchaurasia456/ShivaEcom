const Product = require('../models/product');
// const { param } = require('../routes/user_routes.js');

const ctrl_Product_entry = async (req, res) => {
    try {
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

        const { title, mrp, price, desc, sku, category, stockQuantity, listingStatus, color, size } = req.body;

        const newProduct = new Product({
            images,
            title,
            mrp,
            price,
            listingStatus,
            desc,
            sku,
            category,
            stock: {
                quantity: stockQuantity,  // Add stock quantity
                // status: stockStatus,      // Add stock status
            },
            attributes: {
                color,  // Add color
                size,   // Add size
            },
        });
        console.log("newProduct",newProduct)

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

const ctrl_edit_Product = async (req, res) => {
    try {
        const _id = req.params.id;
        console.log(`Product ID: ${_id}`);
        console.log('Request Body:', req.body); // Check if body is correctly parsed

        // Find the product by its ID
        const product = await Product.findById(_id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Collect updated images if they are uploaded
        const images = [];
        if (req.files) {
            // Check if each image exists and add its path to the images array
            if (req.files.image1) images.push(req.files.image1[0].path);
            if (req.files.image2) images.push(req.files.image2[0].path);
            if (req.files.image3) images.push(req.files.image3[0].path);
            if (req.files.image4) images.push(req.files.image4[0].path);
        }

        console.log('Images:', images); // Log the collected images

        // Extract other fields from the request body
        const { title, mrp, price, desc, sku, category, stockQuantity, listingStatus, color, size } = req.body;
        console.log('Payload:', { title, mrp, price, desc, sku, category, stockQuantity, listingStatus, color, size });

        // Update the product fields if they are provided in the request
        product.title = title || product.title;
        product.mrp = mrp || product.mrp;
        product.price = price || product.price;
        product.desc = desc || product.desc;
        product.listingStatus = listingStatus || product.listingStatus;
        product.sku = sku || product.sku;
        product.category = category || product.category;

        // Update stock information (quantity and status)
        if (product.stock) {
            product.stock.quantity = stockQuantity || product.stock.quantity;
            // product.stock.status = stockStatus || product.stock.status;
        }

        // Update attributes (color and size)
        if (product.attributes) {
            product.attributes.color = color || product.attributes.color;
            product.attributes.size = size || product.attributes.size;
        }

        // Update product images only if new ones are provided
        if (images.length > 0) {
            product.images = images;
        }

        // Save the updated product to the database
        await product.save();
        console.log('Product updated successfully');

        // Send the response with the updated product
        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        console.error('Error while updating product:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};



module.exports = { 
    ctrl_Product_entry, 
    ctrl_Product_get, 
    ctrl_Product_details,
    ctrl_edit_Product
 };
