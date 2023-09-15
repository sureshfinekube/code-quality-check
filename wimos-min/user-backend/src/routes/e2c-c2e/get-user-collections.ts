import express, { Request, Response } from 'express';
import { BadRequestError } from '../../middlewares/custom-err/bad-request-error';
import { Collection } from '../../models/collections';
import { validateRequest } from '../../middlewares/controller-middleware-validator/request-validate';
import { userIdValidator } from '../../middlewares/controller-middlewares/userId-middleware';

const router = express.Router();

router.get('/:userId',
    userIdValidator, validateRequest,
    async (req: Request, res: Response) => {

        let userId = req.params.userId;

        if (!req.store?.storeId) throw new BadRequestError('Store not found');

        let myCollections = await Collection.find({
            storeId: req.store.storeId,
            userId: userId
        }).exec();

        res.json({
            status: true,
            data: myCollections
        });
    }
);


export { router as getUserCollectionsRouter };