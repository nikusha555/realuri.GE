import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
import initRoutes from './routes/init.js'
import dotenv from 'dotenv';
import cors from 'cors';

// Load the .env.production file (or you can use .env by default in development)
dotenv.config({ path: '.env' });  // Explicitly load .env.production in production


app.use(cors({
    origin: ['http://localhost:4200'], // Front-end origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Include credentials if required

}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));





initRoutes(app);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});