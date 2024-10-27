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

module.exports = {
    ctrl_admin_login
};