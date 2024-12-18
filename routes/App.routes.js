import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    console.log('Hello, this is my new project about news! :)');
});


export default router;