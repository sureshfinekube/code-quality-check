import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-err';
import { log } from '../services/logger'

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    log.error(err)

    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    res.status(400).send({
        errors: [
            { message: 'Something went wrong' }
        ]
    });

}