import { body } from "express-validator";

export const validateIdMiddleware = [
    body("id")
        .isMongoId()
        .withMessage("Invalid id")
]