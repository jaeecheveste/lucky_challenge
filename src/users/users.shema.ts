import * as Joi from 'joi'

export const UsersProfileSchema = Joi.object({
  username: Joi.string().trim().required(),
  password: Joi.string().trim().required().min(8).max(10),
  name: Joi.string().required(),
  address: Joi.string().required(),
  cityID: Joi.number().required()
})