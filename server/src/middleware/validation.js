const Joi = require('@hapi/joi');

const registrationValidate = (data) => { 
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    surname: Joi.string().min(4).required(),
    email: Joi.string().min(6).required().email(),
    password:Joi.string().min(8).required(),
    role: Joi.string().required(),
    username: Joi.string().min(6).required()
  });

  return schema.validate(data);
}

const loginValidate = (data) => { 
    const schema = Joi.object({
      username: Joi.string().min(4).required(),
      password:Joi.string().min(8).required()
    });
  
    return schema.validate(data);
}
  

module.exports.registrationValidate = registrationValidate;
module.exports.loginValidate = loginValidate;