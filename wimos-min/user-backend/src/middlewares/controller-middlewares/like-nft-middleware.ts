import { body, check } from "express-validator";

export const likeNftValidator = [
    check('nftId')
        .notEmpty()
        .isMongoId()
        .withMessage('nftId is not valid')
];