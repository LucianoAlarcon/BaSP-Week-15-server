import Joi from 'joi';

export const validateLoginBody = (req, res, next) => {
  const authValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{8,30}$/).required(),
  });
  const validation = authValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export const validateRegisterBody = (req, res, next) => {
  const authValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{8,30}$/).required(),
  });
  const validation = authValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};
