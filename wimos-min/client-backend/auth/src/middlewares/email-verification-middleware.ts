import { body } from "express-validator"

export const emailVerificationMiddleware = [
    body('name')
        .isString()
        .isLength({ min: 3, max: 50 })
        .withMessage('Name should be atleast 3 characters'),
    body('username')
        .custom(value => !/\s/.test(value))
        .withMessage('No spaces are allowed in the username')
        .trim()
        .isString()
        .notEmpty()
        .isLength({ min: 3, max: 50 })
        .withMessage('Username should be atleast 3 characters'),
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .custom(value => !/\s/.test(value))
        .withMessage('No spaces are allowed in the password')
        .trim()
        .isString()
        .notEmpty()
        .isLength({ min: 6, max: 30 })
        .withMessage('Password must be in between 6 and 30 characters'),
    body('phone_number')
        .custom(value => !/\s/.test(value))
        .withMessage('No spaces are allowed in the phone number')
        .isLength({ min: 6, max: 13 })
        .withMessage('Phone number must be in between 6 and 13 characters'),
    body('phone_code')
        .custom(value => !/\s/.test(value))
        .withMessage('No spaces are allowed in the phone number')
        .isLength({ min: 1, max: 5 })
        .withMessage('Invalid country code'),
    body('nationality')
        .isString()
        .notEmpty()
        .isLength({ min: 4, max: 16 })
        .withMessage('nationality must be valid')
]

