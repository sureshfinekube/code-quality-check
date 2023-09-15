import { body } from "express-validator";

export const notificationSettingsValidation = [
    body('endBid')
        .notEmpty()
        .isBoolean()
        .withMessage('endBid must be valid'),
    body('nftPurchase')
        .notEmpty()
        .isBoolean()
        .withMessage('nftPurchase must be valid'),
    body('newBid')
        .notEmpty()
        .isBoolean()
        .withMessage('newBid must be valid'),
    body('likeAndFollow')
        .notEmpty()
        .isBoolean()
        .withMessage('likeAndFollow must be valid')
]