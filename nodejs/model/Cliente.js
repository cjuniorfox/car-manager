const mongoose = require('mongoose');

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
        ref: 'clienteveiculos'
    }]
});

const cliente = mongoose.model('clientes', clienteSchema);

module.exports = {
    Cliente : cliente
}