import express from 'express';
const router = express.Router();
import db from '../../../config/db.conf.js';

router.put('/:id', async (req, res) => {
    const newsId = req.params.id;
    const { title, content, imageFileName, categoryId, isHot } = req.body;

    if (!title || !content || !imageFileName || !categoryId) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Calculate `hot_until` (7 days if `isHot`, otherwise null)
    const hotUntil = isHot ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : null;

    const query = `
        UPDATE news 
        SET title = ?, content = ?, image_file_name = ?, category_id = ?, is_hot = ?, hot_until = ?
        WHERE id = ?
    `;

    try {
        // Execute the update query
        const [result] = await db.query(query, [title, content, imageFileName, categoryId, isHot ? 1 : 0, hotUntil, newsId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'News not found' });
        }

        res.status(200).json({ message: 'News updated successfully' });
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred while updating the news.' });
    }
});

export default router;
