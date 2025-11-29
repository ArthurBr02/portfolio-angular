const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploads
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(path.join(__dirname, uploadDir)));

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Routes Placeholder
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Portfolio API' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
