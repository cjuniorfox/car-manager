export interface ClienteVeiculo {
    carro: {
        marca: string,
        _id: number
    },
    carroModelo: {
        nome: string,
        _id: string
    },
    placa: string,
    chassi: string,
    _id: string
}

export interface Cliente {
    nome: string,
    documento?: {
        documento?: string,
        tipoDocumento?: string
    },
    endereco: {
        endereco: string,
        cidade: string,
        cep: string
    },
    telefones: Array<string>,
    veiculos: Array<ClienteVeiculo>,
    _id: string
}