import { body } from "express-validator";

export const loginRouteValidation = [
    body('metamaskId')
        .notEmpty()
        .isString()
        .withMessage('Metamask ID must be a string'),
    body('signature')
        .notEmpty()
        .isString()
        .withMessage('signature must be a string'),
    body('msg')
        .notEmpty()
        .isString()
        .withMessage('msg must be a string')
];