import { param } from "express-validator";


export const checkIdValidation = [
    param('id')
        .isMongoId()
        .withMessage('Invalid Id')
]