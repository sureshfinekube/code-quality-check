import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/current-user/require-auth';
import { BadRequestError } from '../../middlewares/custom-err/bad-request-error';
import { NotAuthorizedError } from '../../middlewares/custom-err/not-authorized-error';

const router = express.Router();

router.post('/',
   currentUser, requireAuth,
    async (req: Request, res: Response) => {

        if (!req?.store?.storeId) throw new BadRequestError('Store not found');

        // if (req.session?.jwt) {
        //     req.session = null;
        //     res.send({ status: true })
        // } else throw new NotAuthorizedError()

        if (req.cookies?.session) {
            // res.cookie('jwttoken', '', { httpOnly: true, signed: false, sameSite: 'none', secure: true, expires: new Date(Date.now()) });
            res.send({ status: true })
        } else throw new NotAuthorizedError()

    }
);


export { router as logoutRouter };