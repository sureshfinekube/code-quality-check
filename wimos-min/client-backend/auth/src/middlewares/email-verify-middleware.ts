import { body } from "express-validator";

export const emailVerifyMiddleware = [
    body('id')
        .isMongoId()
        .withMessage('Id must be valid'),
    body('otp')
        .trim()
        .isLength({ min: 6, max: 6 })
        .withMessage('Otp must be valid')
]