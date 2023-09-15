import { body } from "express-validator";

export const blogCategoryMiddleware = [
    body('store_id')
        .isMongoId()
        .withMessage('Store is not valid'),
    body('title')
        .isString()
        .isLength({ min: 3, max: 28 })
        .withMessage('Title must be in between 3 and 28 characters')
];