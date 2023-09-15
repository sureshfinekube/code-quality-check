import { param } from "express-validator";

export const getPackageMiddleware = [
    param('id')
        .isMongoId()
        .withMessage('Id must be valid')
]