const express = require("express");
const connectDB = require("./config/db")
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
const path = require('path');
const admin = require("./routes/admin_routes")
const user = require("./routes/user_routes")
const payment = require("./routes/payment")

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(cors());

connectDB();

app.get('/', (req, res) => {
    res.send("Hii")
});

app.use('/api/admin', admin);
app.use('/api/user', user);
app.use('/api/user/payment', payment);


app.listen(port, () => {
    console.log(`Server is running on the ${port}`);
});