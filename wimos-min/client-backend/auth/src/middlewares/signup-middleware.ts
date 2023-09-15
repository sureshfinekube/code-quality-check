import { body } from "express-validator"

export const SignupBodyValidator = [
    body('email')
        .isEmail()
        .withMessage("Email must be valid"),
    body('password')
        .trim()
        .isString()
        .isLength({ min: 4, max: 20 })
        .withMessage("Password must be between 4 and 20 characters"),
    body('name')
        .isString()
        .isLength({ min: 3, max: 18 })
        .withMessage('Name must be between 3 and 18 characters'),
    body('username')
        .custom(value => !/\s/.test(value))
        .isLength({ min: 4, max: 16 })
        .withMessage('Username must be between 4 and 16 characters and space not allowed'),
    body('phone_number')
        .trim()
        .isLength({ min: 7, max: 14 }),
    body('phone_code')
        .isString()
        .isLength({ min: 2, max: 5 })
        .withMessage('Nationality phone_code must be passed'),
    body('nationality')
        .isString()
        .trim()
        .isLength({ min: 2, max: 20 })
        .withMessage('Nationality must be valid'),
    body('store_name')
        .isString()
        .trim()
        .isLength({ min: 5, max: 20 })
        .withMessage('Store name must be in between 5 and 20 characters'),
    body('domain_name')
        .isString()
        .custom(value => !/\s/.test(value))
        .isLength({ min: 4, max: 15 })
        .withMessage('Domain must be in between 4 and 15 characters and space not allowed')
]