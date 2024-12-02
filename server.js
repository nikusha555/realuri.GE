const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./config/db.conf');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const initRoutes = require('./routes/init');
initRoutes(app);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});