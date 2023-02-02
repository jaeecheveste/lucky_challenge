import * as Joi from 'joi'

export const UsersProfileSchema = Joi.object({
  username: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
  name: Joi.string().required(),
  address: Joi.string().required(),
  cityID: Joi.number().required()
})