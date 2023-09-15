import { body } from "express-validator";

export const updateBlogMiddleware = [
    body('id')
        .isMongoId()
        .withMessage('id is not valid'),
    body('title')
        .isString()
        .isLength({ min: 4, max: 28 })
        .withMessage('Title must be in between 4 and 28 characters'),
    body('readTime')
        .optional()
        .isString()
        .isLength({ max: 30 })
        .withMessage('Title must be max 30 characters'),
    body('image_title')
        .isString()
        .isLength({ min: 4 })
        .withMessage('Image-title must be minimum 4 characters'),
    body('heading')
        .isString()
        .isLength({ min: 4, max: 33 })
        .withMessage('Heading must be in between 4 and 33 characters'),
    body('description')
        .isString()
        .isLength({ min: 4 })
        .withMessage('Description must be minimum 4 characters'),
    body('meta_tags')
        .isArray({ min: 1 })
        .withMessage('At least 1 meta_tag needed'),
    body('meta_description')
        .isString()
        .isLength({ min: 8 })
        .withMessage('Meta tags must be minimum 8 characters'),
    body('tags')
        .isArray({ min: 1 })
        .withMessage('At least 1 tag needed'),
    body('status')
        .isBoolean()
        .withMessage('Status must be boolean')
];