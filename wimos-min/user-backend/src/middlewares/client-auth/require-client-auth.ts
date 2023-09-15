import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../custom-err/not-authorized-error';

export const requireClientAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('in currentUser validation==#==',req.currentClient)
    if (!req.currentClient) {
        throw new NotAuthorizedError();
    } else {
        next();
    }
}