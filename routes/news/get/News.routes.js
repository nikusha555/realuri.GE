import express from 'express';
const router = express.Router();
import db from '../../../config/db.conf.js';  // Correct the path to db.conf.js





router.get('/', async (req, res) => {
    const query = `
       SELECT 
             news.id, 
             news.title, 
             news.content, 
             news.image_file_name, 
             news_categories.name AS category_name,
             news.created_date
         FROM 
             news
         JOIN 
             news_categories 
         ON 
             news.category_id = news_categories.id
              ORDER BY 
         news.created_date DESC;
      `;

      try {
        // Execute the query using the connection pool
        const [rows] = await db.query(query);
        res.json(rows); // Send the result as JSON
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error fetching news.');
    }
    
});


export default router;
