import { body } from "express-validator"


export const SigninBodyValidator = [
    body('email')
        .notEmpty()
        .withMessage("Please enter email or username"),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply password')
]