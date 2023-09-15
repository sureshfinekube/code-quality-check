import { body, check } from "express-validator";

export const sellNftValidator = [
    body('id')
        .isMongoId()
        .withMessage('Id should be valid'),
    check('royalties')
        .optional()
        .isFloat()
        .withMessage('Royalties not found'),
    check('price')
        .if(body("sellType").equals("fixed"))
        .isFloat()
        .notEmpty()
        .withMessage('Price not found'),
    body('sellType')
        .isIn(['auction', 'fixed', 'bid'])
        .withMessage('Sell type must be fixed, auction or bid'),
    check('endDate')
        .if(body('sellType').custom((value) => value === 'auction'))
        .isISO8601()
        // .custom((value) => /^((0[1-9]|[12][0-9]|3[01])(\/)(0[13578]|1[02]))|((0[1-9]|[12][0-9])(\/)(02))|((0[1-9]|[12][0-9]|3[0])(\/)(0[469]|11))(\/)\d{4}$/.test(value))
        .withMessage('End date should be valid'),
    // check('endTime')
    //     .if(body('sellType').custom((value) => value === 'auction'))
    //     .custom((value) => /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value))
    //     .withMessage('End time should be valid'),
    check('startingPrice')
        .if(body('sellType').custom((value) => value === 'auction'))
        .isFloat()
        .withMessage('Starting price should be provided'),
    body('signature')
        .isArray()
        .withMessage('signature should be valid')
        .optional()
        
];