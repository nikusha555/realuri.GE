import express from 'express';
const router = express.Router();
import db from '../../../config/db.conf.js';

router.put('/:id', async (req, res) => {
    const newsId = req.params.id;
    const { title, content, imageFileName, categoryId } = req.body;

    if (!title || !content || !imageFileName || !categoryId) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = `
        UPDATE news 
        SET title = ?, content = ?, image_file_name = ?, category_id = ? 
        WHERE id = ?
    `;

    try {
        // Execute the update query using the database connection pool
        const [result] = await db.query(query, [title, content, imageFileName, categoryId, newsId]);

        if (result.affectedRows === 0) {
            // No rows updated, indicating the news ID does not exist
            return res.status(404).json({ message: 'News not found' });
        }

        // Respond with a success message
        res.status(200).json({ message: 'News updated successfully' });
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred while updating the news.' });
    }
});

export default router;
