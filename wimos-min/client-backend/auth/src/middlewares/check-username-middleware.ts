import { query } from "express-validator"


export const checkUsernameValidator = [
    query('username')
        .notEmpty()
        .withMessage("Please add username")
]