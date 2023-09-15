import { currentClient, NotAuthorizedError, requireAuth, validateRequest } from '@finekube/nft-client-common';
import express, { Request, Response } from 'express';
import { param } from 'express-validator';
import { Store } from '../models/store';

const router = express.Router();


router.get('/',
    currentClient, requireAuth,
    async (req: Request, res: Response) => {

        console.log('req......:',req.currentClient)

        // If client not Authorized
        if (!req?.currentClient?.id) {
            throw new NotAuthorizedError();
        };

        try {
            // Find the stores related to the client
            let clientStores = await Store.find({ clientId: req.currentClient.id });
            res.send(clientStores)
        }
        catch (err) {
            throw new Error();
        }


    })


export { router as getClientStoresRouter };