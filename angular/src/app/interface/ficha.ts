import { User } from './user';
import { Cliente, ClienteVeiculo } from './cliente';
import { Servico } from './ficha-servico';

export interface finalizado {
    at: Date,
    user: User
}

export interface Ficha {
    created: {
        user: User,
        at: Date,
        from: string
    },
    osSistema: Number,
    osInterna: Number,
    dadosCadastrais: {
        cliente: Cliente,
        clienteVeiculo: ClienteVeiculo
    },
    entrada: {
        dataRecepcao: Date,
        dataPrevistaSaida: Date,
        avariaExterior: {
            existente: boolean,
            detalhe: string
        },
        avariaInterior: {
            existente: boolean,
            detalhe: string
        },
        pertencesNoVeiculo: {
            existente: boolean,
            detalhe: string
        },
        servicosPrevisao: [string]
    },
    servicos: [Servico],
    finalizado: finalizado,
    retornos: [{
        finalizacaoAnterior: finalizado,
        data: Date,
        justificativa: string
    }],
    _id: string
};