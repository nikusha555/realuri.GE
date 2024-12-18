import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
import initRoutes from './routes/init.js'
import dotenv from 'dotenv';

// Load the .env.production file (or you can use .env by default in development)
dotenv.config({ path: '.env' });  // Explicitly load .env.production in production



app.use(express.json());
app.use(express.urlencoded({ extended: true }));





initRoutes(app);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});