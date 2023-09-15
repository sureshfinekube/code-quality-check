import { body } from "express-validator";

export const updateCategoryMiddleware = [
    body('name')
        .notEmpty()
        .isString()
        .isLength({ min: 3, max: 24 })
        .withMessage('Name is required and must be minimum 3 characters and maximum 24 characters'),
    body('categoryId')
        .notEmpty()
        .isMongoId()
        .withMessage('Category Id is required and must be a valid Id'),
    body('storeId')
        .notEmpty()
        .isMongoId()
        .withMessage('Store Id is required and must be a valid Id'),
    body('status')
        .isBoolean()
        .withMessage('Status is required and must be a boolean')
]