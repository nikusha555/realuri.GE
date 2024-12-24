import express from 'express';
const router = express.Router();
import db from '../../../config/db.conf.js';

router.post('/', async (req, res) => {
    const { title, content, imageFileName, categoryId } = req.body;

    // Validate input fields
    if (!title || !content || !imageFileName || !categoryId) {
        return res.status(400).json({ error: 'All fields (title, content, imageFileName, categoryId) are required' });
    }

    const query = `
        INSERT INTO news (title, content, image_file_name, category_id) 
        VALUES (?, ?, ?, ?)
    `;

    try {
        // Execute the insert query using the connection pool
        const [result] = await db.query(query, [title, content, imageFileName, categoryId]);

        // Respond with success message and the ID of the inserted news
        res.status(201).json({ message: 'News added successfully', newsId: result.insertId });
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred while adding the news.' });
    }
});


export default router;
