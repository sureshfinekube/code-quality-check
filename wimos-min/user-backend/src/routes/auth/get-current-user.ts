import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/current-user/require-auth';
import { BadRequestError } from '../../middlewares/custom-err/bad-request-error';
import { NotAuthorizedError } from '../../middlewares/custom-err/not-authorized-error';
import { User } from '../../models/users';

const router = express.Router();


router.get('/',
    currentUser, requireAuth,
    async (req: Request, res: Response) => {
        if (!req.currentUser?.id) throw new NotAuthorizedError();
        
        let user = await User.findOne({ _id: req.currentUser.id, storeId: req.store?.storeId })
        .populate({path: 'wishlist.nftId', select: ['name','uri', 'collectionId', '_id'], populate : {
            path : 'collectionId',
            select: ['name', '_id']
        }});

        // let user = await User.aggregate([
        //     {
        //         $match: {
        //             _id: req.currentUser.id,
        //             storeId: req.store?.storeId
        //         }
        //     },
        //     {
        //         $unwind: {
        //             path: 'wishlist',
        //             preserveNullAndEmptyArrays: true
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: 'nfts',
        //             localField: 'wishlist.nftId',
        //             foreignField: '_id',
        //             as: 'wishlist.nftId'
        //         }
        //     },
        //     {
                
        //     }
        // ])

        if (!user) throw new BadRequestError('User not found');

        res.json({
            status: true,
            data: user
        });
    }
);


export { router as getCurrentUser };