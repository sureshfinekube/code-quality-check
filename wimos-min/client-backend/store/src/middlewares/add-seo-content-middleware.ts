import { body } from "express-validator";

export const addSeoContents = [
    body('storeId')
        .notEmpty()
        .isMongoId()
        .withMessage('storeId is required and must be in proper id format'),
    body('meta_title')
        .isString()
        .isLength({ max: 200 }),
    body('meta_description')
        .isString()
        .isLength({ max: 200 })
        .withMessage('meta_description must be maximum 200 characters'),
    body('meta_tag')
        .isString(),
    body('robotsText')
        .isString()
        .isLength({ max: 500 })
];