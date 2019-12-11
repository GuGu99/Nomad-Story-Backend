import Joi from 'joi';

export const regFormIsVaild = (userRegForm) => {
  const regForm = Joi.object({
    user_id : Joi.string()
      .required()
      .alphanum()
      .min(6)
      .max(15),
    username : Joi.string()
      .required()
      .alphanum()
      .min(2)
      .max(15),
    password : Joi.string()
      .required()
      .min(6),
    email : Joi.string()
      .required()
      .email()
  });

  return regForm.validate(userRegForm);
};

export const loginFormIsVaild = (userLoginForm) => {
  const loginForm = Joi.object({
    user_id : Joi.string()
      .alphanum()
      .min(6)
      .max(15)
      .required(),
    password : Joi.string()
      .min(6)
      .required()
  });

  return loginForm.validate(userLoginForm);
}
