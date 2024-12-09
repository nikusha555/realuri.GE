const mysql = require('mysql2');
require('dotenv').config();

// Create a connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    
});

// Connect to the database
connection.connect(err => {
    if (err) {
        console.error('Connection failed:', err.message);
    } else {
        console.log('Database connected successfully!');
    }
    
});

module.exports = connection;
