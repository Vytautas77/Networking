import joi from "joi";

const userRegistrationSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
});

export { userRegistrationSchema };
