import { body } from "express-validator";

export const updateStoreMiddleware = [
    body('storeId')
        .isMongoId()
        .withMessage('Id must be valid'),
    body('store_name')
        .optional({ checkFalsy: true })
        .isString()
        .isLength({ max: 100 }),
    // .isLength({ min: 3, max: 12 })
    // .withMessage('Store name must be in between 3 and 12 characters'),
    body('store_content')
        .optional({ checkFalsy: true })
        .isString()
        .isLength({ max: 300 }),
    // .isLength({ min: 2, max: 200 })
    // .withMessage('Store content must be in between 2 and 200 characters'),
    body('bannerHeading')
        .optional({ checkFalsy: true })
        .isString()
        .isLength({ max: 100 }),
    // .isLength({ min: 2, max: 50 })
    // .withMessage('Banner heading must be in between 2 and 50 characters'),
    body('footerContent')
        .optional({ checkFalsy: true })
        .isString()
        .isLength({ max: 300 }),
    body('store_domain')
        .optional({ checkFalsy: true })
        .isString()
        .custom((value) => (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(value)))
        .isLength({ max: 100 }),
    body('type')
        .notEmpty()
        .isLength({ max: 1 })
    // .withMessage('Footer content must be in between 2 and 200 characters')
];