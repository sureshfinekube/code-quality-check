import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface ClientPayload {
    id: string;
    email: string
};

declare global {
    namespace Express {
        interface Request {
            currentClient?: ClientPayload
        }
    }
}

export const currentClient = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // if (!req?.session?.jwt) {
    //     return next();
    // }

    let token = '';

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return next();
    } else {
        token = authHeader.split(' ')[1];
    }

    try {

        // const payload = jwt.verify(
        //     req.session.jwt,
        //     process.env.JWT_KEY!
        // ) as ClientPayload;

        const payload = jwt.verify(
            token,
            process.env.JWT_KEY!
        ) as ClientPayload;

        req.currentClient = payload;
        next();
    }
    catch (err) {
        next();
    }
}