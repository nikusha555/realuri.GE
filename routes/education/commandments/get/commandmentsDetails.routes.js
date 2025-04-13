import express from 'express';
const router = express.Router();
import db from '../../../../config/db.conf.js';  // Correct the path to db.conf.js



router.get('/:id', async (req, res) => {
    const query = `
        SELECT 
            commandments.id AS commandment_id,
            commandments.name AS commandment_name,
            commandments.content AS commandment_content,
            commandments.video_url,
            quiz.id AS quiz_id,
            quiz.title AS quiz_title,
            quiz_questions.id AS question_id,
            quiz_questions.question,
            quiz_questions.answer_1,
            quiz_questions.answer_2,
            quiz_questions.answer_3,
            quiz_questions.correct_answer
        FROM 
            commandments
        LEFT JOIN 
            quiz ON commandments.quiz_id = quiz.id
        LEFT JOIN 
            quiz_questions ON quiz.id = quiz_questions.quiz_id
        ORDER BY 
            commandments.created_date DESC, quiz_questions.id ASC;
    `;

    try {
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error fetching commandments and quiz data');
    }
});

export default router;