import { body } from "express-validator";

export const followValidation = [
    body('userId')
        .notEmpty()
        .isString()
        .withMessage('userId must be valid')
]