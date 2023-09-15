import { body } from "express-validator";


export const createNFTValidation = [
    body('name')
        .isString(),
        // .isLength({ min: 3, max: 50 })
        // .withMessage('Name should be in between 3 and 50 characters'),
    body('description')
        .isString(),
        // .isLength({ min: 3, max: 500 })
        // .withMessage('Description should be in between 3 and 500 characters'),
    body('collectionId')
        .isMongoId()
        .withMessage('Id should be valid'),
    body('tokenId')
        .optional()
        .isString()
        .isLength({ min: 1 })
        .withMessage('Token Id should be valid'),
    body('address')
        .isString()
        .isLength({ min: 2 })
        .withMessage('Address should be valid'),
    body('uri')
        .isString()
        .isLength({ min: 2 })
        .withMessage('Uri should be valid'),
    body('mintFrom')
        .isString()
        .isLength({ min: 2 })
        .withMessage('minfrom should be valid'),
    body('copies')
        .isNumeric()
        .optional(),
    body('signer')
        .isObject()
        .optional(),
    // body('royalities')
    //     .isNumeric()
    //     .optional()
];
