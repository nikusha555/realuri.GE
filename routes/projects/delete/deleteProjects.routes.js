import express from 'express';
const router = express.Router();
import db from '../../../config/db.conf.js';

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Delete query
        const query = `DELETE FROM projects WHERE id = ?;`;

        // Execute query
        const [result] = await db.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({ message: "Project deleted successfully" });

    } catch (err) {
        console.error("Error deleting project:", err);
        res.status(500).json({ message: "Error deleting project" });
    }
});

 export default router;