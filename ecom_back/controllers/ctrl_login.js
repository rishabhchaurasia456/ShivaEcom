const UserRegister = require("../models/user");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
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

        // Generate OTP and set expiry (10 minutes)
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10-minute expiry

        // Create a new user with OTP (not activated yet)
        const newUser = new UserRegister({
            name,
            email,
            mobile,
            password,
            otp,
            otpExpiry,
        });

        await newUser.save();

        // Send OTP to user's email (you'll need a function to send emails)
        await sendOtpToEmail(email, otp);

        res.status(201).json({ message: 'User registered successfully. Please verify your email with the OTP sent.' });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const ctrl_verify_otp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }

        // Find the user by email
        const user = await UserRegister.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if OTP matches and is not expired
        if (user.otp !== otp || new Date(user.otpExpiry) < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Clear OTP and expiry, and mark the user as verified (if needed)
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully!' });
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


        const token = jwt.sign(
            { userId: user._id, email: user.email },
            secretkey,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ message: 'Login successful', token, user });

    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const generateOtp = () => {
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // ensures a 6-digit number
    return otp.toString();
};

const sendOtpToEmail = async (email, otp) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',  // You can replace this with any email service (e.g., SendGrid, etc.)
        auth: {
            user: "rishabhchaurasia456@gmail.com",
            pass: "qlhx mxrm qrfw jpjt"
        }
    });

    const mailOptions = {
        from: "rishabhchaurasia456@gmail.com",
        to: email,
        subject: 'Verify Your Email OTP',
        text: `Your OTP is: ${otp}. This OTP will expire in 10 minutes.`
    };

    return transporter.sendMail(mailOptions);
};

const ctrl_user_request_reset = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Check if user exists
        const user = await UserRegister.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate OTP and expiry time
        const otp = generateOtp(); // Assume this function generates a random 6-digit OTP
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

        console.log('Generated OTP:', otp, 'Expiry:', otpExpiry);

        // Update user with OTP and expiry
        user.otp = otp;
        user.otpExpiry = otpExpiry;

        await user.save(); // Ensure the document is saved to the database

        // Send OTP via email (assume sendOtpToEmail works correctly)
        await sendOtpToEmail(email, otp);

        res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
};

const ctrl_user_forget_password = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ error: 'Email and OTP are required' });
        }

        console.log('Received email:', email, 'Received OTP:', otp);

        // Find user by email
        const user = await UserRegister.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('Stored OTP:', user.otp, 'Stored Expiry:', user.otpExpiry);

        // Check if OTP matches
        if (user.otp !== otp) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        // Check if OTP has expired
        if (new Date(user.otpExpiry) < new Date()) {
            return res.status(400).json({ error: 'OTP has expired' });
        }

        // If `newPassword` is provided, reset the password
        if (newPassword) {
            user.password = newPassword; // Directly assign new password (hash if needed)
            user.otp = null; // Clear OTP after successful verification
            user.otpExpiry = null; // Clear OTP expiry after use
            await user.save();

            console.log('Password reset successfully for:', email);
            return res.status(200).json({ message: 'Password reset successfully' });
        }

        // If no `newPassword`, respond positively for OTP verification
        res.status(200).json({ message: 'OTP verified successfully!' });
    } catch (error) {
        console.error('Error during OTP verification or password reset:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    ctrl_admin_login,
    ctrl_user_reg,
    ctrl_user_login,
    ctrl_user_request_reset,
    ctrl_user_forget_password,
    ctrl_verify_otp
};