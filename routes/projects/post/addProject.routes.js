import express from 'express';
const router = express.Router();
import db from '../../../config/db.conf.js';

// POST method to add a new project
router.post('/', async (req, res) => {
    try {
        // Extract data from request body
        const { name, content, goal, status_id, link } = req.body;

        // Validate required fields
        if (!name || !content || !goal || !status_id) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Insert query
        const query = `
            INSERT INTO projects (name, content, goal, status_id, link, created_at) 
            VALUES (?, ?, ?, ?, ?, NOW());
        `;  

        // Execute query
        const [result] = await db.query(query, [name, content, goal, status_id, link]);

        // Return success response
        res.status(201).json({ message: "Project added successfully", projectId: result.insertId });

    } catch (err) {
        console.error("Error adding project:", err);
        res.status(500).json({ message: "Error adding project" });
    }
});

export default router;
