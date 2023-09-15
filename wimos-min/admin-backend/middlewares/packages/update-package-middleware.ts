import { check } from "express-validator";
import { body } from "express-validator";

export const UpdatePackageMiddleware = [
    body('id')
        .isMongoId()
        .withMessage('Id should be a valid'),
    body('name')
        .isString()
        .isLength({ min: 3, max: 20 })
        .withMessage('Name must be in between 3 and 20 characters'),
    body('type')
        .isString()
        .custom((value) => value === "monthly_subscription" || value === "yearly_subscription")
        .withMessage('Type should be monthly_subscription or yearly_subscription'),
    body('features')
        .isArray({ min: 1 })
        .withMessage('Features should atleast 1'),
    body('amount')
        .isFloat()
        .withMessage('Amount should be a valid'),
    body('unlimited_product')
        .isBoolean()
        .withMessage('Must be a boolean value'),
    body('unlimited_page')
        .isBoolean()
        .withMessage('Must be a boolean value'),
    body('unlimited_store')
        .isBoolean()
        .withMessage('Must be a boolean value'),
    check('product_limit')
        .if(body('unlimited_product').contains(false))
        .isNumeric()
        .withMessage('Numeric value only allowed'),
    check('page_limit')
        .if(body('unlimited_page').contains(false))
        .isNumeric()
        .withMessage('Numeric value only allowed'),
    check('store_limit')
        .if(body('unlimited_store').contains(false))
        .isNumeric()
        .withMessage('Numeric value only allowed'),
    body('description')
        .isString()
        .isLength({ min: 4, max: 700 })
        .withMessage('Description should be in between 4 and 700 characters'),

    body('unlimited_user')
        .isBoolean()
        .withMessage('Must be a boolean value'),
    body('unlimited_collection')
        .isBoolean()
        .withMessage('Must be a boolean value'),    

    check('user_limit')
        .if(body('unlimited_user').contains(false))
        .isNumeric()
        .withMessage('Numeric value only allowed'),
    check('collection_limit')
        .if(body('unlimited_collection').contains(false))
        .isNumeric()
        .withMessage('Numeric value only allowed'), 
];
