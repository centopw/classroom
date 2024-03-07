const express = require('express');
const mysql = require('mysql2');
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
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
// Handle form submission
app.post('/submit', (req, res) => {
  const { name, address, country } = req.body;
  // Insert data into MySQL database
  pool.query('INSERT INTO customers (name, address, country) VALUES (?, ?, ?)', [name,
    address, country], (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Error inserting data into database');
        return;
      }
      console.log('Data inserted successfully:', results);
      res.send('Data inserted successfully');
    });
});
// Start the server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});