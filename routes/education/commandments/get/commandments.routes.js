import express from 'express';
const router = express.Router();
import db from '../../../../config/db.conf.js';  // Correct the path to db.conf.js





router.get('/', async (req, res) => {
    const query = `
       SELECT 
             commandments.name,
             commandments.content
         FROM 
             commandments
        
      `;

    try {
        // Execute the query using the connection pool
        const [rows] = await db.query(query);
        res.json(rows); // Send the result as JSON
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error fetching commandments');
    }

});


export default router;
