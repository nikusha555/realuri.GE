const express = require('express');
const router = express.Router();
const db = require('../../config/db.conf');




router.get('/', (req, res) => {
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
             news.category_id = news_categories.id;
      `;

    db.query(query, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error fetching news.');
        } else {
            res.json(result);
        }
    });
});


module.exports = router;
