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

app.use(express.urlencoded({ extended: true})); // to check req.body.

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/viajes', async(req, res) => {
    const viajes = await Viaje.find({});
    res.render('viajes/index', { viajes });
});

app.get('/viajes/nuevo', (req, res) => {
    res.render('viajes/new');
});

app.post('/viajes', async (req, res) => {
    // res.send(req.body);
    // {"viaje":{"aeronave":"Jet","empresa":"Seplacosa","solicitante":"RC Dalton","f_solicitud":"2022-07-14","salida":"2022-07-30","regreso":"2022-08-07","pasajeros":"fasdfdsa","notas":"fdafds"}}
    const viaje = new Viaje(req.body.viaje);
    // res.send(viaje);
    // {"aeronave":"Jet","empresa":"Seplacosa","solicitante":"RC Dalton","f_solicitud":"2022-07-27T00:00:00.000Z","salida":"2022-07-30T00:00:00.000Z","regreso":"2022-07-30T00:00:00.000Z","pasajeros":"Juan Perez","notas":"Feria del Cafe","_id":"62e1df5d7d536e4db94474ed"}
    await viaje.save();
    res.redirect(`/viajes/${viaje._id }`)
});

app.get('/viajes/:id', async(req, res) => {
    const { id } = req.params;
    const viaje = await Viaje.findById(id);
    res.render('viajes/show', { viaje });
});


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});