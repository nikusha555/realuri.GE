import express from 'express';
const router = express.Router();
import db from '../../../config/db.conf.js';

router.put('/:id', (req, res) => {
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

    db.query(query, [title, content, imageFileName, categoryId, newsId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'News not found' });
        }

        res.status(200).json({ message: 'News updated successfully' });
    });
});

export default router;
