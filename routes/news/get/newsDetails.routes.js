import express from 'express';
const router = express.Router();
import db from '../../../config/db.conf.js';

router.get('/:id', async (req, res) => {
    const newsId = req.params.id;
    const query = `
     SELECT 
            news.id, 
            news.title, 
            news.content, 
            news.image_file_name, 
            news_categories.name AS category_name
        FROM 
            news
        JOIN 
            news_categories 
        ON 
            news.category_id = news_categories.id
    WHERE news.id = ? `;

    try {
        // Pass the parameter `newsId` to the query
        const [rows] = await db.query(query, [newsId]);

        if (rows.length === 0) {
            // If no news item is found
            return res.status(404).json({ message: 'News not found' });
        }

        res.json(rows[0]); // Send the first result as JSON (since `id` is unique)
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred while fetching the news.' });
    }
});

export default router;