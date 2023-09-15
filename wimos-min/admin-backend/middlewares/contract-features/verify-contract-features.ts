import Joi, { number, string } from 'joi';
import JoiObjectId from "joi-objectid";
const objectId = JoiObjectId(Joi);
import { Request, Response, NextFunction, response } from 'express';

const validation = (data) => {
  const Schema = Joi.object({
    featureIds: Joi.array().items(objectId()).required().label('featureIds'),
  });
  return Schema.validate(data);
};

export const validateVerifyContractFeatures = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dataValidation = await validation(req.body);
  console.log('daa validation',dataValidation)
  if (dataValidation.error) {
      const message = dataValidation.error.details[0].message.replace(/"/g, '');
      return res.status(422).json({
        status: false,
        message
      });
  }

  next()
}

