import { body, check } from "express-validator";

export const transferNftValidator = [
  check("nftId").notEmpty().isMongoId().withMessage("nftId is not valid"),
  check("toWalletAddress")
    .notEmpty()
    .isString()
    .withMessage("toWalletAddress is not valid"),
  check("copies")
    .optional()
    .isNumeric()
    .withMessage("copies is not valid"),
];
