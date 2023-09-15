import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/current-user/require-auth';
import { BadRequestError } from '../../middlewares/custom-err/bad-request-error';
import { Collection } from '../../models/collections';

const router = express.Router();


router.get('/',
    currentUser, requireAuth,
    async (req: Request, res: Response) => {

        if (!req.store?.storeId) throw new BadRequestError('Store not found');
        if (!req.currentUser?.id) throw new BadRequestError('User not authorized');

        let myCollections = await Collection.aggregate([
            {
                $match: {
                    storeId: req.store?.storeId,
                    userId: req.currentUser.id
                }
            },
            {
                $addFields: {
                    _id: {'$toString': '$_id'}
                }
            },
            {
                $lookup: {
                    from: 'nfts',
                    localField: '_id',
                    foreignField: 'collectionId',
                    as: 'count'
                }
            },
            {
                $addFields: {
                    count: {$size: '$count'},
                    id: '$_id'
                }
            },
            {
                $project: {
                    _id: 0,
                }
            }
        ]);

        res.json({
            status: true,
            data: myCollections
        });

    }
);

export { router as getMyCollectionsRouter };