import { body } from "express-validator";

export const updateClientMiddleware = [
    body('name')
        .isString()
        .isLength({ min: 3, max: 16 })
        .withMessage('Name must be in between 3 and 16 characters'),
    body('phone_number')
        .custom(value => !/\s/.test(value))
        .withMessage('No spaces are allowed in the phone number')
        .isLength({ min: 6, max: 13 })
        .withMessage('Phone number must be in between 6 and 13 characters'),
    body('phone_code')
        .custom(value => !/\s/.test(value))
        .withMessage('No spaces are allowed in the country code')
        .isLength({ min: 1, max: 5 })
        .withMessage('Invalid country code'),
    body('nationality')
        .isString()
        .notEmpty()
        .isLength({ min: 4, max: 16 })
        .withMessage('nationality must be valid')
]