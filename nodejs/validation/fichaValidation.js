const Joi = require('@hapi/joi');
const { ServicoEnum, SetorEnum, BoxEnum } = require('../enum/setorServicoBoxEnum');

const fichaSchema = Joi.object({
    osSistema: Joi.number().required(),
    osInterna: Joi.number().optional(),
    retorno: Joi.boolean().optional(),
    dadosCadastrais: {
        cliente: Joi.string().required(),
        clienteVeiculo: Joi.string().required()
    },
    entrada: {
        dataRecepcao: Joi.date().optional(),
        dataPrevisaoSaida: Joi.date().optional(),
        avariaExterior: {
            existente: Joi.boolean().required(),
            detalhe: Joi.string()
                .when('existente',
                    { is: true, then: Joi.required() }),
        },
        avariaInterior: {
            existente: Joi.boolean().required(),
            detalhe: Joi.string()
                .when('existente',
                    { is: true, then: Joi.required() }),
        },
        pertencesNoVeiculo: {
            existente: Joi.boolean().required(),
            detalhe: Joi.string()
                .when('existente',
                    { is: true, then: Joi.required() }),
        },
        servicosPrevisao: Joi.array()
            .required().items(
                Joi.valid(ServicoEnum.CORTESIA, ServicoEnum.DUCHA, ServicoEnum.LAVAGEM_SIMPLES, ServicoEnum.LAVAGEM_COMPLETA)
            )
    }
});

const fichaPostValidation = (data) => {
    return fichaSchema.validate(data);
}

const fichaPatchValidation = (data) => {
    return fichaSchema.allOptional().validate(data);
}

const fichaFinalizadoValidation = (data) => {
    const schema = Joi.object({
        at: Joi.date().optional()
    });
    return schema.validate(data);
}

const fichaServicoValidation = (data) => {
    const schema = Joi.object({
        servico: Joi.required().valid(ServicoEnum.CORTESIA, ServicoEnum.DUCHA, ServicoEnum.LAVAGEM_COMPLETA, ServicoEnum.LAVAGEM_SIMPLES),
        setor: Joi.required().valid(SetorEnum.OF, SetorEnum.SL, SetorEnum.TD, SetorEnum.VN, SetorEnum.VU),
        box: Joi.required().valid(BoxEnum.DETALHAMENTO, BoxEnum.LAVAGEM),
        descricao: Joi.string().required(),
        inicio: Joi.date().required(),
        fim: Joi.date().optional()
    });
    return schema.validate(data);
}

const fichaIdValidation = (data) => {
    const schema = Joi.object({
        _id: Joi.required().valid(),
        servico_id: Joi.optional()
    });
    return schema.validate(data);
}
const fichaIdServicoValidation = (data) => {
    const schema = Joi.object({
        _id: Joi.required(),
        servico_id: Joi.required()
    });
    return schema.validate(data);
}


module.exports = {
    fichaPostValidation,
    fichaPatchValidation,
    fichaServicoValidation,
    fichaPatchValidation,
    fichaIdValidation,
    fichaIdServicoValidation,
    fichaFinalizadoValidation
}