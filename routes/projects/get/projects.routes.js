import express from 'express';
const router = express.Router();
import db from '../../../config/db.conf.js';

router.get('/', async (req, res) => {
    const query = `
        SELECT 
            projects.id, 
            projects.name, 
            projects.content,  
            projects.goal,
            projects.link,
            project_status.name AS status_name,  
            projects.created_at
        FROM 
            projects
        JOIN 
            project_status
        ON 
            projects.status_id = project_status.id
        ORDER BY 
            projects.created_at DESC;
    `;

    try {
        const [rows] = await db.query(query);
        res.json(rows); // Send the result as JSON
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error fetching projects.');
    }
});



export default router;