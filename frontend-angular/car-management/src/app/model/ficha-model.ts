export class FichaModel {
    retorno: Boolean;
    setor: String;
    dataRecepcao: Date;
    dataPrevistaSaida: Date;
    osSistema: Number;
    osInterna: Number;
    cliente: Number; //Relacionar a objeto
    veiculo: Number; //Relacionar a objeto
    avariaInterior: {
        existente: Boolean,
        detalhe: String
    };
    pertencesNoVeiculo: {
        existente: Boolean,
        detalhe: String
    };
    tipoServico: {
        tipo: String,
        descServicos: String
    }
}
