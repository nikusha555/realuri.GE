import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
import initRoutes from './routes/init.js'
import dotenv from 'dotenv';
import cors from 'cors';
import './jobs/cronJobs.js';

dotenv.config({ path: '.env' });  // Explicitly load .env.production in production


app.use(cors({
    origin: ['https://newswebsitev23.netlify.app/'], // Front-end origin
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