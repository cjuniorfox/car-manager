const mongoose = require('mongoose');

const carroSchema = new mongoose.Schema({
    marca : {
        type : String,
        required : [true,"Marca requerida."],
        min : [3,"Marca exige um mínimo de 3 caracteres."]
    },
    modelo : {
        type : String,
        required : [true,"Modelo requerido"]
    }
});

module.exports = mongoose.model('Carro',carroSchema);