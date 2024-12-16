const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./config/db.conf');

const dotenv = require('dotenv');  // Add dotenv to load environment variables

// Load the .env.production file (or you can use .env by default in development)
dotenv.config({ path: '.env' });  // Explicitly load .env.production in production



app.use(express.json());
app.use(express.urlencoded({ extended: true }));




const initRoutes = require('./routes/init');
initRoutes(app);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});