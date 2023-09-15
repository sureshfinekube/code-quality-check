import { body } from "express-validator";

export const selectPackageMiddleware = [
    body("storeId")
        .isMongoId()
        .withMessage("Store Id must be valid"),
    body("packageId")
        .isMongoId()
        .withMessage('Package Id must be valid')
];