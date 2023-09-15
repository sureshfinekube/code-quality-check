import Joi from 'joi';
import JoiObjectId from "joi-objectid";
const objectId = JoiObjectId(Joi);
import { Request, Response, NextFunction, response } from 'express';

const validation = (data) => {
  const Schema = Joi.object({
    id: objectId().required().label("id"),
    name: Joi.string().required().label('name'),
    type: Joi.string().required().valid('ERC115', 'ERC721').label('type'),
    description: Joi.string().required().label('description'),
    amount: Joi.number().required().label('amount')
  });
  return Schema.validate(data);
};

export const validateUpdateContractFeature = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dataValidation = validation(req.body);
  if (dataValidation.error) {
      const message = dataValidation.error.details[0].message.replace(/"/g, '');
      return res.status(422).json({
        status: false,
        message
      });
  }

  next()
}

