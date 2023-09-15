import { body } from "express-validator";

export const auctionNftSellActionValidator = [
    body("nftId")
        .isMongoId()
        .withMessage("Invalid nftId"),
    body('auctionOfferId')
        .isMongoId()
        .withMessage('Invalid auctionOfferId')
]