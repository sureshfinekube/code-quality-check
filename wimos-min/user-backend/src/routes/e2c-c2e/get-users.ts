import express, { Request, Response } from 'express';
const router = express.Router();
import { User } from '../../models/users';
import { BadRequestError } from '../../middlewares/custom-err/bad-request-error';

router.get('/',
    async (req: Request, res: Response) => {

        if (!req?.store?.storeId) throw new BadRequestError('Store not found');

        let users = await User.find({ storeId: req.store?.storeId }).exec();

        res.json({
            status: true,
            data: users
        });

    }
);

export { router as getUsersRouter };