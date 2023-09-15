import { Request, Response, NextFunction, response } from 'express';
import { validationResult } from 'express-validator';

export const validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json(
            errors.array().map(err => {
                return { message: err.msg, field: err.param };
            })
        );
    }

    next();
}