const Product = require('../models/product');

const ctrl_Product_entry = async (req, res) => {
    try {
        const images = [];

        // Check if files exist and handle the files array
        if (req.files && req.files.length > 0) {
            req.files.forEach((file) => {
                images.push(file.path); // Store the file path of each uploaded image
            });
        }

        // Destructure form fields from req.body and provide fallback values if needed
        const { title, mrp, price, desc, sku, category, stockQuantity, listingStatus, color, size } = req.body;

        // Validate required fields
        // if (!listingStatus) {
        //     return res.status(400).json({ message: 'listingStatus is required' });
        // }

        // if (!stockQuantity) {
        //     return res.status(400).json({ message: 'stock quantity is required' });
        // }

        // Create a new product with all the form data
        const newProduct = new Product({
            images,
            title,
            mrp,
            price,
            listingStatus, // Ensure this is provided
            desc,
            sku,
            category,
            stock: {
                quantity: stockQuantity,  // Add stock quantity (provide default if none)
            },
            attributes: {
                color,  // Add color
                size,   // Add size
            },
        });

        console.log("newProduct", newProduct); // Log the new product

        // Save the new product to the database
        await newProduct.save();

        // Return a success response
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.error('Server Error:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error', error });
    }
};

const ctrl_Product_get = async (req, res) => {
    try {
        const getallproduct = await Product.find()
        res.status(200).json({ message: "Product fetch successfully", getallproduct })
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

        // Find the product by its ID
        const product = await Product.findById(_id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Collect new uploaded images if they exist
        let newImages = [];
        if (req.files && req.files.length > 0) {
            newImages = req.files.map((file) => file.path);
        }

        console.log('New Images:', newImages);

        // The existing images coming from the frontend (after possible removal)
        const existingImages = req.body.existingImages || [];

        console.log('Existing Images from Request:', existingImages);

        // Merge existing and new images
        const updatedImages = [...existingImages, ...newImages];

        console.log('Updated Images:', updatedImages);

        // Extract other fields from the request body
        const { title, mrp, price, desc, sku, category, stockQuantity, listingStatus, color, size } = req.body;

        // Update product fields if provided in the request
        product.title = title || product.title;
        product.mrp = mrp || product.mrp;
        product.price = price || product.price;
        product.desc = desc || product.desc;
        product.listingStatus = listingStatus || product.listingStatus;
        product.sku = sku || product.sku;
        product.category = category || product.category;

        // Update stock information (quantity)
        if (product.stock) {
            product.stock.quantity = stockQuantity || product.stock.quantity;
        }

        // Update attributes (color and size)
        if (product.attributes) {
            product.attributes.color = color || product.attributes.color;
            product.attributes.size = size || product.attributes.size;
        }

        // Update images array in the product document
        if (updatedImages.length > 0) {
            product.images = updatedImages;
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
