const express = require("express");
const connectDB = require("./config/db")
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
const path = require('path');
const admin = require("./routes/admin_routes")
const user = require("./routes/user_routes")

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


app.listen(port, () => {
    console.log(`Server is running on the ${port}`);
});