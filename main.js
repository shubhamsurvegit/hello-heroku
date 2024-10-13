const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware (optional)
app.use(express.json()); // For parsing application/json

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello heroku paas world !');
});

app.get('/get-env', (req, res) => {
    res.json(process.env);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at port :${port}`);
});
