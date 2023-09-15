import express, { Request, Response } from 'express';
import { BadRequestError } from '../../middlewares/custom-err/bad-request-error';
import { Collection } from '../../models/collections';
import { NftCollection } from '../../models/nfts';
import { User } from '../../models/users';

const router = express.Router();

router.get('/',
    async (req: Request, res: Response) => {

        if (!req.store?.storeId) throw new BadRequestError('Store not found');

        // Date for the current day
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        // Get Total users count
        let usersCount = await User.find({ storeId: req.store?.storeId }).countDocuments().exec();

        // Get Today users count
        let todayUsersCount = await User.find({ storeId: req.store?.storeId, createdAt: { $gte: today } }).countDocuments().exec();

        // Get Total nfts count
        let nftsCount = await NftCollection.find({ storeId: req.store?.storeId }).countDocuments().exec();

        // Get today nfts count
        let todayNftsCount = await NftCollection.find({ storeId: req.store?.storeId, createdAt: { $gte: today } }).countDocuments().exec();

        // Get total collections
        let collectionsCount = await Collection.find({ storeId: req.store?.storeId }).countDocuments().exec();

        // Get today collections
        let todayCollectionsCount = await Collection.find({ storeId: req.store?.storeId, createdAt: { $gte: today } }).countDocuments().exec();

        // Get total Revenue
        let maximum = 20000;
        let minimum = 1000;
        let totalRevenue = (Math.random() * (maximum - minimum + 1)) << 0;

        res.json({
            status: true,
            data: {
                usersCount,
                todayUsersCount,
                nftsCount,
                todayNftsCount,
                collectionsCount,
                todayCollectionsCount,
                totalRevenue
            },
            message: "Data Fetched Successfully"
        });
    }
);

export { router as getDashboardDataRouter };