import { body } from "express-validator";

export const updatePasswordMiddleware = [
    body('old_password')
        .custom(value => !/\s/.test(value))
        .withMessage('No spaces are allowed in the password')
        .trim()
        .isString()
        .notEmpty()
        .isLength({ min: 4, max: 16 })
        .withMessage('Password must be in between 4 and 16 characters'),
    body('new_password')
        .custom(value => !/\s/.test(value))
        .withMessage('No spaces are allowed in the password')
        .trim()
        .isString()
        .notEmpty()
        .isLength({ min: 4, max: 16 })
        .withMessage('Password must be in between 4 and 16 characters')
];