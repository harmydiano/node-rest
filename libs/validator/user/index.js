const Joi = require('@hapi/joi');

const userCreate = Joi.object({
    fullName: Joi.string()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
    .min(8)
    .max(30)
    .required(),
    phoneNumber: Joi.string()
        .required()
})

module.exports = userCreate