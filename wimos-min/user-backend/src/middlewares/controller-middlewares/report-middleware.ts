import { body } from "express-validator";

export const reportValidation = [
    body('type')
        .notEmpty()
        .isString()
        .isIn(['nft', 'user'])
        .withMessage('type must be valid'),
    body('nftId')
        .if(body("type").equals("nft"))
        .notEmpty()
        .isString()
        .withMessage('Subject must be valid'),
    body('userId')
        .if(body("type").equals("user"))
        .notEmpty()
        .isString()
        .withMessage('Subject must be valid'),
    body('subject')
        .notEmpty()
        .isString()
        .withMessage('Subject must be valid'),
    body('message')
        .isString()
        .isLength({ max: 50 })
        .withMessage('Name should be maximum 50 characters'),
]