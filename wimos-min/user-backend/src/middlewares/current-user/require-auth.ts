import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { NotAuthorizedError } from '../custom-err/not-authorized-error';

export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.currentUser) {
        console.log('in currentUser validation====',req.currentUser)
        throw new NotAuthorizedError();
    } else {
        next();
    }
}