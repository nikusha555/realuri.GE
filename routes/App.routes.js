const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('Hello, this is my new project about news! :)');
});


module.exports = router;