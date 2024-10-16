const express = require('express');
require('dotenv').config();
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

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
app.get('/get-pdf', (req, res) => {
    const htmlContent = `
        <html>
            <head>
                <title>Sample PDF</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    h1 { color: blue; }
                </style>
            </head>
            <body>
                <h1>Hello, WeasyPrint!</h1>
                <p>This is a PDF generated from HTML.</p>
            </body>
        </html>
    `;

    // Save the HTML content to a temporary file
    const htmlFilePath = path.join(__dirname, 'temp.html');
    const pdfFilePath = path.join(__dirname, 'output.pdf');

    fs.writeFileSync(htmlFilePath, htmlContent);

    // Command to run WeasyPrint
    const command = `weasyprint ${htmlFilePath} ${pdfFilePath}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error generating PDF: ${error.message}`);
            return res.status(500).send('Error generating PDF');
        }
        if (stderr) {
            console.error(`WeasyPrint stderr: ${stderr}`);
            return res.status(500).send('Error generating PDF');
        }

        // Send the PDF file in the response
        res.download(pdfFilePath, 'output.pdf', (err) => {
            if (err) {
                console.error(`Error sending PDF: ${err.message}`);
            }
            // Clean up temporary files
            fs.unlinkSync(htmlFilePath);
            fs.unlinkSync(pdfFilePath);
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at port :${port}`);
});
