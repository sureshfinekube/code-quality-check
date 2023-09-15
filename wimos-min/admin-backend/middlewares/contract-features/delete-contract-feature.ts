import Joi from 'joi';
import JoiObjectId from "joi-objectid";
const objectId = JoiObjectId(Joi);
import { Request, Response, NextFunction, response } from 'express';

const validation = (data) => {
  const Schema = Joi.object({
    id: objectId().required().label("id"),
  });
  return Schema.validate(data);
};

export const validateDeleteContractFeature = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dataValidation = validation({id: req.params.id});
  if (dataValidation.error) {
      const message = dataValidation.error.details[0].message.replace(/"/g, '');
      return res.status(422).json({
        status: false,
        message
      });
  }

  next()
}