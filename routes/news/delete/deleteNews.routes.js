import express from 'express';
const router = express.Router();
import db from '../../../config/db.conf.js';

router.delete('/:id', async (req, res) => {
    const newsId = req.params.id;

    const query = `DELETE FROM news WHERE id = ?`;

    try {
        const [result] = await db.query(query, [newsId]); // Use the pool and await query execution

        if (result.affectedRows === 0) {
            // If no rows are affected, the news item doesn't exist
            return res.status(404).json({ message: 'News not found' });
        }

        // If deletion is successful
        res.status(200).json({ message: 'News deleted successfully' });
    } catch (err) {
        // Handle errors and respond with a 500 status code
        console.error('Error deleting news:', err);
        res.status(500).json({ error: 'An error occurred while deleting the news.' });
    }
});

export default router;
