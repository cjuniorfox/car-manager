const mongoose = require('mongoose');

const clienteVeiculoSchema = new mongoose.Schema({
    carro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carro'
    },
    carroModelo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CarroModelo'
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
            ref: 'Cliente'
        },
        date: Date
    }
});

const clienteVeiculo = mongoose.model('ClienteVeiculo', clienteVeiculoSchema);
module.exports = {
    ClienteVeiculo: clienteVeiculo
}