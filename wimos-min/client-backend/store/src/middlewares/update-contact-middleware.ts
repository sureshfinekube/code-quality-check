import { body } from "express-validator";

export const updateContactMiddleware = [
    body('storeId')
        .isMongoId()
        .withMessage('Invalid storeId'),
    body('nationality')
        .optional()
        .isString()
        .isLength({max: 50})
        .withMessage('Invalid nationality'),
    body('email')
        .optional()
        .isEmail()
        .withMessage('Invalid email'),
    body('countryCode')
        .optional()
        .isString()
        .isLength({max: 50})
        .withMessage('Invalid countryCode'),
    body('phone')
        .optional()
        .isNumeric()
        .isLength({min: 6, max: 15})
        .withMessage('Invalid phone number'),
    body('address')
        .optional()
        .isString()
        .isLength({max: 800})
        .withMessage('Address is invalid or characters limit exceeded'),
    body('status')
        .optional()
        .isBoolean()
        .withMessage('status is invalid')
]