const UserRegister = require("../models/user");
const jwt = require('jsonwebtoken');
const secretkey = "qwerty123456789";

const ctrl_admin_login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(404).json({ message: 'username or password is not found' });
        }

        // Instead of redirecting, return a success response
        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const ctrl_user_reg = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        if (!name || !email || !mobile || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the user already exists (by email or mobile)
        const existingUser = await UserRegister.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new UserRegister({
            name,
            email,
            mobile,
            password
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const ctrl_user_login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user by email
        const user = await UserRegister.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored password (assuming it's stored in plaintext)
        if (user.password.trim() !== password.trim()) {
            console.log("Comparison result:", user.password === password); // Log comparison result
            return res.status(401).json({ message: 'Invalid credentials' });
        }


        // Create a JWT token (excluding sensitive data)
        const token = jwt.sign(
            { userId: user._id, email: user.email }, 
            secretkey, 
            { expiresIn: '1h' } // Token expiration (optional)
        );

        // Send back the token in the response
        return res.status(200).json({ message: 'Login successful', token });
        
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = {
    ctrl_admin_login,
    ctrl_user_reg,
    ctrl_user_login
};