const mongoose = require('mongoose');

const clienteVeiculoSchema = new mongoose.Schema({
    carro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carros'
    },
    carroModelo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carromodelos'
    },
    placa: {
        type: String,
        min: 7,
        max: 7
    },
    chassi: {
        type: String,
        min: 10,
        max: 10
    },
    deleted: {
        cliente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'clientes'
        },
        date: Date
    }
});

const clienteVeiculo = mongoose.model('clienteveiculos', clienteVeiculoSchema);
module.exports = {
    ClienteVeiculo: clienteVeiculo
}