import express from 'express';
const router = express.Router();
import db from '../../../config/db.conf.js';

router.post('/', async (req, res) => {
    const { title, content, imageFileName, categoryId, isHot } = req.body;

    // Calculate the expiration date if the news is marked as hot
    const hotUntil = isHot ? new Date(Date.now() + 2 * 60 * 1000) : null;

    // Validate input fields
    if (!title || !content || !imageFileName || !categoryId) {
        return res.status(400).json({ error: 'All fields (title, content, imageFileName, categoryId) are required' });
    }

    const query = `
            INSERT INTO news (title, content, image_file_name, category_id, is_hot, hot_until) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;

    try {
        // Execute the insert query and pass all necessary values, including is_hot and hot_until
        const [result] = await db.query(query, [title, content, imageFileName, categoryId, isHot ? 1 : 0, hotUntil]);

        // Respond with success message and the ID of the inserted news
        res.status(201).json({ message: 'News added successfully', newsId: result.insertId });
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred while adding the news.' });
    }
});

export default router;

