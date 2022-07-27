require('dotenv').config();
const mongoose = require('mongoose');
const Viaje = require('../models/viaje');

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

const seedDB = async() => {
    await Viaje.deleteMany({});
    await Viaje.insertMany([
        {aeronave: 'Jet', empresa: 'INCOFE', solicitante: 'F Dalton', f_solicitud:'2022-4-4', salida: '2022-7-25', regreso: '2022-7-29', destino: 'St. Louis MO / Denver, CO', pasajeros: 'Frank Dalton', notas: 'Visitas/Reuniones Pursell, InfoAG, Trible'},
        {aeronave: 'Jet', empresa: 'RCDM', solicitante: 'RC Dalton', f_solicitud:'2022-6-17', salida: '2022-8-7', regreso: '2022-8-14', destino: 'Houston, TX', pasajeros: 'Roberto C Dalton'},
        {aeronave: 'Jet', empresa: 'INCOFE', solicitante: 'F Dalton', f_solicitud:'2022-7-25', salida: '2022-8-16', regreso: '2022-8-19', destino: 'Colombia', pasajeros: 'Frank Dalton'},
        {aeronave: 'Jet', empresa: 'INCOFE', solicitante: 'F Dalton', f_solicitud:'2022-7-25', salida: '2022-8-22', regreso: '2022-8-26', destino: 'Peru / Ecuador', pasajeros: 'Frank Dalton'},
        {aeronave: 'Jet', empresa: 'INCOFE', solicitante: 'RC Dalton', f_solicitud:'2022-6-30', salida: '2022-9-10', regreso: '2022-9-15', destino: 'Dallas, TX', pasajeros: 'Roberto C Dalton'},
        {aeronave: 'Jet', empresa: 'RCDM', solicitante: 'RC Dalton', f_solicitud:'2022-6-30', salida: '2022-9-15', regreso: '2022-9-20', destino: 'Dallas Tx, Houston', pasajeros: 'Roberto C Dalton'},
        {aeronave: 'Jet', empresa: 'Sacos Agroindustriales', solicitante: 'RC Dalton', f_solicitud:'2022-6-21', salida: '2022-10-19', regreso: '2022-10-19', destino: 'Houston', pasajeros: 'Roberto C Dalton', notas: 'Feria K Dusseldorf'},
        {aeronave: 'Jet', empresa: 'RCDM', solicitante: 'K Dalton', f_solicitud:'2022-6-18', salida: '2022-10-22', regreso: '2022-11-2', destino: 'Washington, DC', pasajeros: 'Karen Dalton'}
    ]);
}

seedDB();