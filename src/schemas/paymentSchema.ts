import Joi from "joi";

export const paymentSchema = Joi.object({
    cardId: Joi.number().required(),
    businessId: Joi.number().required(),
    password: Joi.string().length(4).required(),
    amount: Joi.number().required(),
});