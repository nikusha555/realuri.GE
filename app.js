const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./db');

app.get('/nika', (req, res) => {
    console.log('Hello, this is my new project about news! :)');
});

app.get('/news', (req, res) => {
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

app.get('/newsDetails/:id', (req, res) => {
    const newsId = req.params.id;
    const query = `
    SELECT news.id, news.title, news.content
    FROM news 
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


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
