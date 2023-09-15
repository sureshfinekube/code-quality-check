import { body } from "express-validator";

export const updateSharedContractMiddleware = [
    body('type')
        .isString()
        .notEmpty()
        .isIn(['erc721', 'erc1155'])
        .withMessage('type should be either erc721 or erc1155'),
    body('marketPlaceAbi')
        .notEmpty()
        .isArray()
        .withMessage('marketPlaceAbi must be an array'),
    body('nftAbi')
        .notEmpty()
        .isArray()
        .withMessage('nftAbi must be an array'),
    body('marketplaceContractAddress')
        .notEmpty()
        .isString(),
    body('nftContractAddress')
        .notEmpty()
        .isString(),
    body('chainId')
        .isString()
        .notEmpty()
        .isIn(['1', '2', '3', '4', '5'])
        .withMessage('chainId should be in between 1 to 5')
]