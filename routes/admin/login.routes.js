import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../../config/db.conf.js'; // Database connection
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const router = express.Router();
router.use(cookieParser()); // Enable cookie parsing middleware

// Admin login route
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const query = `SELECT * FROM admin_users WHERE username = ?`;
        console.log('Executing query:', query, 'with username:', username);

        // Query the database to find the admin by username
        const [admins] = await db.query(query, [username]);

        if (admins.length === 0) {
            return res.status(401).json({ message: 'არასწორია username ან password' });
        }

        const admin = admins[0];

        // Check if the provided password matches
        if (admin.password !== password) {
            return res.status(401).json({ message: 'არასწორია username ან password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            {
                id: admin.id,
                username: admin.username,
                email: admin.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: '48h' }
        );

        // Store the token in an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true, // Prevents client-side access
            secure: process.env.NODE_ENV === 'production', // Uses HTTPS in production
            sameSite: 'Strict', // Prevents CSRF attacks
            maxAge: 48* 60 * 60 * 1000, // 48 hours
        });

        res.json({ message: 'თქვენ წარმატებით გაიარეთ ავტორიზაცია' });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'სერვერის შეცდომა' });
    }
});

export default router;
