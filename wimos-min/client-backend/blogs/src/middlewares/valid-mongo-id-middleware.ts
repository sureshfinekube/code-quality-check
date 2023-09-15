import { param } from "express-validator";

export const validMongoIdMiddleware = [
    param('id')
        .isMongoId()
        .withMessage('Id is not valid')
];