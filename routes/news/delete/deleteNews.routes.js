import express from 'express';
const router = express.Router();
import db from '../../../config/db.conf.js';

router.delete('/:id', (req, res) => {
    const newsId = req.params.id;

    const query = `DELETE FROM news WHERE id = ?`;

    db.query(query, [newsId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'News not found' });
        }

        res.status(200).json({ message: 'News deleted successfully' });
    });
});

export default router;
