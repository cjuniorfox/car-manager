const Joi = require('@hapi/joi');
const { ServicoEnum, SetorEnum, BoxEnum } = require('../enum/setorServicoBoxEnum');

const fichaEntradaValidation = (data) => {
    const schema = Joi.object({
        osSistema: Joi.number().required(),
        osInterna: Joi.number().optional(),
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
    return schema.validate(data);
}

const fichaServicoValidation = (data) => {
    const schema = Joi.object({
        servico: Joi.required().valid(Object.values(ServicoEnum)),
        setor: Joi.required().valid(Object.values(SetorEnum)),
        box: Joi.required().valid(Object.values(BoxEnum)),
        descricao: Joi.string().required(),
        inicio: Joi.date().required(),
        fim: Joi.date().optional()
    });
    Joi.validate(schema)
}

module.exports = {
    FichaEntradaValidation: fichaEntradaValidation
}