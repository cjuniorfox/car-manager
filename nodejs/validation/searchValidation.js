const Joi = require('@hapi/joi');

const searchValidation = (data) => {
    const schema = new Joi.object({
        search: Joi.string().optional().allow('',null),
        index: Joi.number(),
        size: Joi.number()
    });
    return schema.validate(data);
}

const searchFichaValidation = (data) => {
    const schema = new Joi.object({
        search: Joi.string().optional().allow('',null),
        index: Joi.number(),
        size: Joi.number(),
        ativas: Joi.string().valid('0', '1').optional()
    });
    return schema.validate(data);
}

module.exports = { 
    searchValidation: searchValidation,
    searchFichaValidation: searchFichaValidation
};