const Joi = require('@hapi/joi');

const clienteValidation = (data) => {
    const schema = Joi.object({
        nome: Joi.string()
            .required()
            .min(4)
            .messages({
                "string.required": "Necessário informar o nome",
                "string.length": "O nome exige um mínimo de 4 caracteres"
            }),
        documento: {
            documento: Joi.string().allow('').allow(null),
            tipoDocumento: Joi.string().allow('').allow(null)
        },
        endereco: {
            endereco: Joi.string()
                .required()
                .messages({ "string.required": "Necessário informar endereço" }),
            cidade: Joi.string()
                .required()
                .messages({ "string.required": "Necessário informar município" }),
            cep: Joi.string()
                .required()
                .length(8)
                .messages({
                    "string.required": "Necessário informar CEP",
                    "string.length": "Cep necessita apenas 8 caracteres"
                })
        },
        telefones: Joi.array()
            .required()
            .messages({ "aray.required": "Necessário informar pelo menos um telefone" }),
        veiculos: Joi.array().items({
            carro: {
                marca: Joi.string(),
                _id: Joi.string()
                    .required()
                    .messages({
                        "string.required": "Necessário selecionar um carro"
                    })
            },
            carroModelo: {
                nome: Joi.string(),
                _id: Joi.string()
                    .required()
                    .messages({
                        "string.required": "Necessário selecionar um modelo"
                    })
            },
            placa: Joi.string()
                .required()
                .length(7)
                .messages({
                    "string.required": "Necessário informar a placa",
                    "string.length": "Digite 7 caracteres"
                }),
            chassi: Joi.string()
                .required()
                .length(10)
                .messages({
                    "string.required": "Necessário informar o chassi",
                    "string.length": "Digite 10 caracteres"
                }),
            _id: Joi.string().allow(null)
        })
    });
    return schema.validate(data);
}

module.exports.ClienteValidation = clienteValidation;