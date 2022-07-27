const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const Viaje = require('./models/viaje');
const port = process.env.PORT || 3000;

let db_url;

if(process.env.MODE_ENV === "local") {
    db_url = process.env.LOCAL_URL;
    console.log(db_url);
} else {
    db_url = process.env.WEB_URL;
    console.log(db_url);
}

mongoose.connect(db_url);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.set('view engine', 'ejs');
app.set('vews', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/viajes', async(req, res) => {
    const viajes = await Viaje.find({});
    res.render('viajes/index', { viajes });
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});