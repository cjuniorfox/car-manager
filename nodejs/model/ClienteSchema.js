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
    }   
});

const clienteVeiculo = mongoose.model('ClienteVeiculo', clienteVeiculoSchema);

const clienteSchema = new mongoose.Schema({
    nome: {
        required: true,
        type: String,
        min: 4
    },
    documento: {
        documento: String,
        tipoDocumento: {
            type: String,
            Enumerator: ['Identidade', 'CPF', 'CNH']
        }
    },
    endereco: {
        endereco: {
            required: true,
            type: String
        },
        cidade: {
            required: true,
            type: String
        },
        cep: {
            required: true,
            type: String
        }
    },
    telefones: [{
        type: String,
        min: 12,
        max: 13
    }],

    veiculos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClienteVeiculo'
    }]
});

const cliente = mongoose.model('Cliente', clienteSchema);

module.exports = {
    ClienteVeiculo : clienteVeiculo,
    Cliente : cliente
}