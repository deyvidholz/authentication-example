import Joi from 'joi';

export function userValidationSchema(): Joi.ObjectSchema {
  return Joi.object({
    username: Joi.string()
      .regex(/\w{4,16}/)
      .required(),

    password: Joi.string().required(),
  });
}
