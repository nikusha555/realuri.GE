import express from 'express';
const router = express.Router();
import db from '../../../config/db.conf.js';


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, content, goal, status_id, link } = req.body;

        // Validate required fields
        if (!name || !content || !goal || !status_id) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Update query
        const query = `
            UPDATE projects 
            SET name = ?, content = ?, goal = ?, status_id = ?, link = ?, updated_at = NOW()
            WHERE id = ?;
        `;

        // Execute query
        const [result] = await db.query(query, [name, content, goal, status_id, link, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({ message: "Project updated successfully" });

    } catch (err) {
        console.error("Error updating project:", err);
        res.status(500).json({ message: "Error updating project" });
    }
});


export default router;