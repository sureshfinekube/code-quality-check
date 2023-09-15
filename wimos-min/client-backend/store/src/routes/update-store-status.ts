import { BadRequestError, currentClient, NotAuthorizedError, requireAuth, validateRequest } from '@finekube/nft-client-common';
import express, { Request, Response } from 'express';
import { updateStoreStatusMiddleware } from '../middlewares/update-store-status-middleware';
import { Store } from '../models/store';

const router = express.Router();

router.put('/',
    currentClient, requireAuth,
    updateStoreStatusMiddleware, validateRequest,
    async (req: Request, res: Response) => {
        let { store_id, status } = req.body;

        // If client not Authorized
        if (!req?.currentClient?.id) {
            throw new NotAuthorizedError()
        };

        // Find the store
        let store = await Store.findById({ _id: store_id });

        // If store is not related to client
        if (store?.clientId !== req?.currentClient?.id) {
            throw new NotAuthorizedError();
        };


        if (store.activeStatus === status) throw new BadRequestError('Same status already found');

        // Update the store
        try {
            let updatedStore = await Store.updateOne(
                { _id: store_id },
                {
                    $set: {
                        activeStatus: status
                    }
                }
            );

            res.json({
                status: true,
                data: updatedStore
            });
        }
        catch (err) {
            throw new Error();
        }

    }
)

export { router as updateStoreStatusRouter };