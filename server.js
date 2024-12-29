import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
import initRoutes from './routes/init.js'
import dotenv from 'dotenv';
import cors from 'cors';

// Load the .env.production file (or you can use .env by default in development)
dotenv.config({ path: '.env' });  // Explicitly load .env.production in production

const allowedOrigins = ['http://127.0.0.1:5500', 'http://localhost:4200'];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g., mobile apps, Postman)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true); // Allow this origin
        } else {
            callback(new Error('Not allowed by CORS')); // Block other origins
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials (cookies, tokens)
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));





initRoutes(app);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});