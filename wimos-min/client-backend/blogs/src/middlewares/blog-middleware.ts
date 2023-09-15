import { body } from "express-validator";

export const blogMiddleware = [
    body('client_id')
        .isMongoId()
        .withMessage('Client id is not valid'),
    body('store_id')
        .isMongoId()
        .withMessage('Store is not valid'),
    body('title')
        .isString()
        .isLength({ max: 300 })
        .withMessage('Title must be maximum 300 characters'),
    body('readTime')
        .optional()
        .isString()
        .isLength({ max: 100 })
        .withMessage('Title must be max 100 characters'),
    body('image_title')
        .optional()
        .isString()
        .withMessage('Invalid image title'),
    body('heading')
        .isString()
        .isLength({ max: 300 })
        .withMessage('Heading must be maximum 3000 characters'),
    body('description')
        .isString(),
    body('meta_tags')
        .optional()
        .isArray(),
    body('meta_description')
        .isString()
        .isLength({ max: 1000 })
        .withMessage('Meta tags characters limit exceeded'),
    body('tags')
        .optional()
        .isArray()
        .withMessage('Invalid tags'),
    body('status')
        .isBoolean()
        .withMessage('Status must be boolean'),
    body('relatedPosts')
        .optional()
        .isArray()
        .withMessage('Invalid related posts'),
    body('categoryId')
        .isMongoId()
        .optional()
        .withMessage('Invalid categoryId')
];