import { User } from './user';
import { Cliente, ClienteVeiculo } from './cliente';
import { ServicoEnum } from '../enum/servico.enum';
import { SetorEnum } from '../enum/setor.enum';
import { BoxEnum } from '../enum/box.enum';

export interface Ficha {
    created: {
        user: User,
        at: Date,
        from: string
    },
    osSistema: Number,
    osInterna: Number,
    dadosCadastrais: Cliente,
    clienteVeiculo: ClienteVeiculo,
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
    servicos: [{
        user: User,
        servico: ServicoEnum,
        setor: SetorEnum,
        box: BoxEnum,
        descricao: string,
        inicio: Date,
        fim: Date
    }],
    finalizado: {
        at: Date,
        user: User
    },
    retorno: boolean
};