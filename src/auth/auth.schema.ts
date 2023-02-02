import * as Joi from 'joi'

export const LoginSchema = Joi.object({
  username: Joi.string().trim().required(),
  password: Joi.string().trim().required().min(8).max(10),
})