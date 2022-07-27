const mongoose = require('mongoose');
const { Schema } = mongoose;

const ViajeSchema = new Schema({
    aeronave: String,
    empresa: String,
    solicitante: String,
    f_solicitud: Date,
    salida: Date,
    regreso: Date,
    destino: String,
    pasajeros: String,
    notas: String
});

module.exports = mongoose.model('Viaje', ViajeSchema);