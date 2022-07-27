const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const Viaje = require('./models/viaje');
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/aviacorp').
  catch(error => handleError(error));

const db = mongoose.connection;
db.on('error', err => {
    logError(err);
  });

db.once('open', ()=> {
    console.log('Database connected');
})

app.set('view engine', 'ejs');
app.set('vews', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/crearviaje', async (req, res) =>{
    const viaje = new Viaje({aeronave: 'Jet', empresa: 'Seplacosa', solicitante: "RCDM"});
    await viaje.save();
    res.send(viaje);
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});