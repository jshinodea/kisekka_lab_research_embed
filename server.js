const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Serve static files from the public directory
app.use(express.static('public'));

// Get port from environment variable or use 5050 as fallback
const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});