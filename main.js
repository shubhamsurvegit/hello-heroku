const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware (optional)
app.use(express.json()); // For parsing application/json

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello heroku paas World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at port :${port}`);
});
