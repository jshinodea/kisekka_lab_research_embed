const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5050;

// Enable CORS for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Serve static files
app.use(express.static('public'));

// Main route for embed.js
app.get('/embed.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'embed.js'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});