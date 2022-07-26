const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('vews', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});