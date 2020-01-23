const mongoose = require('mongoose');

const fichaSchema = new mongoose.Schema({
    created: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        at: {
            type: Date,
            default: Date.now()
        },
        from: {
            type: String,
            required: true,
            min: 32
        }
    },
    osSistema: {
        type: Number,
        required: true
    },
    osInterna: Number,
    dadosCadastrais: {
        cliente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'clientes'
        },
        clienteVeiculo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'clienteveiculos'
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
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
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
    finalizado:{
        at: {
            type: Date
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    },
    retorno: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('fichas', fichaSchema);