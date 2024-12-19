import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    const hello = "Hello, this is our new project about news! :)"
    res.json(hello);
});


export default router;