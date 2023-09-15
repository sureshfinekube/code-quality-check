import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface ClientPayload {
    id: string;
    email: string;
};

declare global {
    namespace Express {
        interface Request {
            currentClient?: ClientPayload
        }
    }
}

export const clientAuth = (
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

        const payload = jwt.verify(
            token,
            process.env.CLIENT_JWT_KEY!
        ) as ClientPayload;

        req.currentClient = payload;
        next();
    }
    catch (err) {
        next();
    }
}