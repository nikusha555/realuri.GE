import express from 'express';
const router = express.Router();
import db from '../../config/db.conf';

router.get('/:id', (req, res) => {
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

    db.query(query, [newsId], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length === 0) {
            return res.status(404).send('News not found');
        } else {
            res.json(result)
        }
    })
})

module.exports = router;