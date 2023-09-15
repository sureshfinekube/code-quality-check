import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    email: string;
    metamaskId: string;
    storeId: string;
};

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    let token = '';

    const authHeader = req?.headers?.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return next();
    } else {
        token = authHeader.split(' ')[1];
    }

    try {

        console.log('jwt',process.env.USER_JWT_KEY)
        console.log('token',token)

        const payload = jwt.verify(
            token,
            process.env.USER_JWT_KEY!
        ) as UserPayload;

        console.log('payllload',payload)

        req.currentUser = payload;
        next();
    }
    catch (err) {
        next();
    }
}