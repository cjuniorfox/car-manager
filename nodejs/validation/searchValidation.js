const Joi = require('@hapi/joi');

const searchValidation = (data) => {
    const schema = new Joi.object({
        search: Joi.string().optional(),
        index: Joi.number(),
        size: Joi.number()
    })
    return schema.validate(data);
}

module.exports = { searchValidation: searchValidation };