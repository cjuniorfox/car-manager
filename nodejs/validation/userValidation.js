const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        tel: Joi.string().min(10).max(11).required(),
        username: Joi.string().min(4).required(),
        password: Joi.string().min(6).max(1024).required(),
        admin: Joi.boolean().optional()
    });
    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(4).required(),
        password: Joi.string().min(4).max(1024).required()
    });
    return schema.validate(data);
}

module.exports = {
    registerValidation: registerValidation,
    loginValidation: loginValidation
}