import express from 'express';
const router = express.Router();
import db from '../../../config/db.conf.js';

router.post('/', (req, res) => {
    const { title, content, imageFileName, categoryId } = req.body;

    if (!title || !content || !imageFileName || !categoryId) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = `
        INSERT INTO news (title, content, image_file_name, category_id) 
        VALUES (?, ?, ?, ?)
    `;

    db.query(query, [title, content, imageFileName, categoryId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({ message: 'News added successfully', newsId: result.insertId });
    });
});

export default router;
