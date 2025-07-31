import { BadRequest } from "../utils/errors.js";

export const validateRequest = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    next();
  } catch (err) {
    const errors = {};
    if (err.inner) {
      err.inner.forEach((e) => {
        if (!errors[e.path]) {
          errors[e.dtopath] = e.message;
        }
      });
    }
    return next(new BadRequest("Validation Failed", errors));
  }
};
