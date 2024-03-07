const express = require('express');
const mysql = require('mysql2');
const ejs = require('ejs');
const app = express();
// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'mydb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
// Set EJS as the view engine
app.set('view engine', 'ejs');
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Serve the HTML form
app.get('/', (req, res) => {
    // Retrieve data from MySQL database
    pool.query('SELECT * FROM customers', (err, results) => {
        if (err) {
            console.error('Error retrieving data:', err);
            res.status(500).send('Error retrieving data from database');
            return;
        }
        // Render the HTML template with the retrieved data
        res.render('index', { users: results });
    });
});
``
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});