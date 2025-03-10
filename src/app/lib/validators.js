import Joi from "joi";

export const registreValidator = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(6).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

export const loginValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
