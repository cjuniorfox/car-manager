const Joi = require('@hapi/joi');

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
            servicosPrevisao: Joi.array().required()
        }
    });
    return schema.validate(data);
}

module.exports = {
    FichaEntradaValidation: fichaEntradaValidation
}