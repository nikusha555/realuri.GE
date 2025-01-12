import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../../config/db.conf.js'; // Assuming you have a db.js for database connection
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// Define your JWT secret key
const JWT_SECRET = 'h4f2h%gdj*hs@gfgsj_)(*bh!@#hbdjsj'; // Replace 'your_secret_key' with a strong, unique key

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
                id: admin.id,          // Admin's unique ID
                username: admin.username,
                email: admin.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        res.json({ token, message: 'თქვენ წარმატებით გაიარეთ ავტორიზაცია' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

export default router;

