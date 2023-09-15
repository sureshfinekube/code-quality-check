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
    // if (!req?.session?.jwt) {
    //     return next();
    // }
    // if (!req?.cookies?.session) {
    //     return next();
    // }

    let token = '';

    const authHeader = req?.headers?.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return next();
    } else {
        token = authHeader.split(' ')[1];
    }

    try {

        // const payload = jwt.verify(
        //     req?.cookies?.session,
        //     process.env.JWT_KEY!
        // ) as UserPayload;

        const payload = jwt.verify(
            token,
            process.env.JWT_KEY!
        ) as UserPayload;

        req.currentUser = payload;
        next();
    }
    catch (err) {
        next();
    }
}