import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    const hello = "მოგესალმებით ჩვენს ვებ გვერდზე"
    res.json(hello);
});


export default router;