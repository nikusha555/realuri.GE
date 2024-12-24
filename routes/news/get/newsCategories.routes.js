import express from 'express';
const router = express.Router();
import db from '../../../config/db.conf.js';



router.get('/:category', async (req, res) => {
    const newsCategory = req.params.category;
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
    WHERE news.category_id = ? `;

    try {
        // Execute the query using the connection pool and pass the category as a parameter
        const [rows] = await db.query(query, [newsCategory]);

        if (rows.length === 0) {
            // If no news items are found for the category
            return res.status(404).json({ message: 'No news found for this category' });
        }

        res.json(rows); // Send the result as JSON
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred while fetching the news.' });
    }
});

export default router;