const mongoose = require('mongoose');
const { ServicoEnum, BoxEnum, SetorEnum } = require('../enum/setorServicoBoxEnum');

const finalizado = new mongoose.Schema({
    at: { type: Date },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});

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
        dataPrevisaoSaida: Date,
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
            Enumerator: Object.values(ServicoEnum),
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
            Enumerator: Object.values(ServicoEnum)
        },
        setor: {
            type: String,
            Enumerator: Object.values(SetorEnum)
        },
        box: {
            type: String,
            Enumerator: Object.values(BoxEnum)
        },
        descricao: { type: String, required: false },
        inicio: { type: Date, required: true },
        fim: Date,
        retorno: { type: mongoose.Schema.Types.ObjectId }
    }],
    finalizado: finalizado,
    retornos: [{
        finalizacaoAnterior: finalizado,
        data: { type: Date, required: true, default: Date.now() },
        user : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        justificativa: { type: String, required: true }
    }]
});

module.exports = mongoose.model('fichas', fichaSchema);