const express = require('express');
const router = express.Router();
const db = require('../../config/db.conf');



router.get('/:category', (req, res) => {
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

    db.query(query, [newsCategory], (err, result) => {
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