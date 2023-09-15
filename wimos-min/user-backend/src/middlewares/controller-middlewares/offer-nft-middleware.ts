import { body, check } from "express-validator";

export const offerNftValidator = [
  body("id").isMongoId().withMessage("Id should be valid"),
  check("price").isFloat().notEmpty().withMessage("Price not found"),
  check("endDate")
  .isISO8601()
//   .custom((value) => /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/.test(value))
    .withMessage("End date should be valid"),

  // check('endDate')
  //     .if(body('sellType').custom((value) => value === 'auction'))
  //     .custom((value) => /^((0[1-9]|[12][0-9]|3[01])(\/)(0[13578]|1[02]))|((0[1-9]|[12][0-9])(\/)(02))|((0[1-9]|[12][0-9]|3[0])(\/)(0[469]|11))(\/)\d{4}$/.test(value))
  //     .withMessage('End date should be valid'),
  // check('endTime')
  //     .if(body('sellType').custom((value) => value === 'auction'))
  //     .custom((value) => /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value))
  //     .withMessage('End time should be valid'),
];
