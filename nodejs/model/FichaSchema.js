const mongoose = require('mongoose');

const fichaSchema = new mongoose.Schema({
    osSistema: {
        type: Number,
        required: true
    },
    osInterna: Number,
    dadosCadastrais: {
        cliente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cliente'
        },
        clientVeiculo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ClienteVeiculo'
        }
    },
    entrada: {
        dataRecepcao: {
            type: Date,
            required: true,
            default: Date.now
        },
        dataPrevistaSaida: Date,
        avariaExterior: {
            existente: {
                type: Boolean,
                required: true
            },
            detalhe: String
        },
        avariaInterior: {
            existente: {
                type: Boolean,
                required: true
            },
            detalhe: String
        },
        pertencesNoVeiculo: {
            existente: {
                type: Boolean,
                required: true
            },
            detalhe: String
        },
        servicosPrevisao: [{
            type: String,
            required: true
        }]
    },
    servicos: [{
        servico: {
            type: String,
            Enumerator: ['Cortesia', 'Ducha', 'Lavagem simples', 'Lavagem completa']
        },
        setor: {
            type: String,
            Enumerator: ['OF', 'VN', 'SL', 'TD', 'VU']
        },
        box: {
            type: String,
            Enumerator: ['Lavagem', 'Detalhamento']
        },
        descricao: {
            type: String,
            required: false
        },
        inicio: {
            type: Date,
            required: true
        },
        fim: Date
    }],

    retorno: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Ficha', fichaSchema);