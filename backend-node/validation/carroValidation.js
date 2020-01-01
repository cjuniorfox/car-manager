const Joi = require('@hapi/joi');

const carroMarcaModeloValidation = (data) => {
    const schema = Joi.object({
        marca: Joi.string()
        .min(3)
        .required()
        .messages({
            'string.min': 'Digite no mínimo 3 caracteres',
            'string.base' : 'Tipo inválido, marca precisa ser texto',
            'string.empty' : 'Por favor preencha a marca'
        }),
        modelo: Joi.string()
            .min(2)
            .required()
            .messages({
                'string.base': 'Tipo inválido. Modelo precisa ser texto',
                'string.min' : 'Digite pelo menos dois caracteres',
                'string.empty': 'Por favor preencha o modelo'
            })
    });
    return schema.validate(data);
}

module.exports.CarroMarcaModeloValidation = carroMarcaModeloValidation;