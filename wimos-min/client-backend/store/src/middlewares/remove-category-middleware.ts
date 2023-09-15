import { body } from "express-validator";

export const removeCategoryMiddleware = [
    body('categoryId')
        .notEmpty()
        .isMongoId()
        .withMessage('Category Id is required and must be a valid Id'),
    body('storeId')
        .notEmpty()
        .isMongoId()
        .withMessage('Store Id is required and must be a valid Id')
]