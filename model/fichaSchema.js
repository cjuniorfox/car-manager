const mongoose = require('mongoose');

const fichaSchema = new mongoose.Schema({
    retorno: {
        type: Boolean,
        required: true,
        default: false
    },
    setor: {
        type: String,
        Enumerator : ['OF', 'VN', 'SL', 'TD', 'VU'] 
    },
    dataRecepcao: Date,
    dataPrevisaoSaida: Date,
    osSistema: {
        type: Number,
        required: true
    },
    osInterna: Number,
    veiculo: {
        type: String,
        required: true
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
    avariaInterior:{
        existente:{
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
    tipoServico: {
        tipo: {
            type:String,
            Enumerator: ['Cortesia', 'Ducha', 'Lavagem simples', 'Lavagem completa', 'Servicos']
        },
        descServicos: String
    }

});

module.exports = mongoose.model('ficha',fichaSchema);