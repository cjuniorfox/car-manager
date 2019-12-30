const mongoose = require('mongoose');

const carroModeloSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "Modelo requerido"],
    }
})

const carroSchema = new mongoose.Schema({
    marca: {
        type: String,
        required: [true, "Marca requerida."],
        min: [3, "Marca exige um mínimo de 3 caracteres."],
        unique: true
    },
    modelos: [carroModeloSchema]

});

module.exports = mongoose.model('Carro', carroSchema);