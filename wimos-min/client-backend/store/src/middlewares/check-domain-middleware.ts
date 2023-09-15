import {  query } from "express-validator";

export const checkDomainBodyMiddleware = [
    query('domain')
        .isString()
        .isLength({ min: 3, max: 30 })
        .withMessage('Domain must be in between 3 and 30 characters')
        .custom((value) => (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(value)))
        // .custom((value) => (/^((?!-)[A-Za-z0-9-]{1, 63}(?<!-)\\.)+[A-Za-z]{2, 6}$/.test(value)))
        // .matches(/^[A-Za-z0-9-]+$/)
        .withMessage('Domain not valid')
]