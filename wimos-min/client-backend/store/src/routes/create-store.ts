import { BadRequestError, currentClient, NotAuthorizedError, requireAuth, validateRequest } from '@finekube/nft-client-common';
import express, { Request, Response } from 'express';
import { StoreCreatedPublisher } from '../events/publishers/create-store-publisher';
import { createStoreBodyValidator } from '../middlewares/create-store-middleware';
import { Client } from '../models/clients';
import { Store } from '../models/store';
import { natsWrapper } from '../nats-wrapper';
import { FreePackage } from '../services/get-free-package';
import { ClientFreePackagePublisher } from '../events/publishers/client-free-package-publisher';
import mongoose from 'mongoose';

const router = express.Router();

// Create Store Route - POST
router.post(
    '/',
    currentClient, requireAuth,
    createStoreBodyValidator,
    validateRequest,

    async (req: Request, res: Response) => {

        if (!req?.currentClient?.id) {
            throw new NotAuthorizedError();
        }

        // Get the required bodies from the request
        let { store_name, network, domain, type } = req.body;

        // Check the Client id is valid
        const client = await Client.findOne({ clientId: req.currentClient.id });
        if (!client) throw new BadRequestError('Client not registered');

        // Check the store_name , sub_domain is not used by other clients
        const sameStoreFound = await Store.findOne({
            $or: [
                // { store_name: store_name },
                { store_domain: domain }
            ]
        });

        // If Already Store found with this credentials
        // if (sameStoreFound) throw new BadRequestError('Already Store found with this credentials');
        if (sameStoreFound) throw new BadRequestError('Domain not available');


        try {

            domain = domain.toLowerCase()

            if (type) {
                if (type !== "marketplace" && type !== "single_store") throw new BadRequestError("Invalid value in 'type' field");
            }

            if (type === 'single_store') {
                let freePackage = await FreePackage.fetch()
    
                if (freePackage.status) {
                    // Publish an event saying that a client created a store
                    new ClientFreePackagePublisher(natsWrapper.client).publish({
                        clientId: req.currentClient.id,
                        packageId: freePackage?.freePackageData?._id
                    });
                    // await Client.updateOne({ _id: req.currentClient.id }, { $set: {packageId: freePackage?.freePackageData?._id} })
                }
            }

            // default categories
            let categories = [
                {
                  id: new mongoose.Types.ObjectId(),
                  name: "Arts",
                  status: true,
                },
                {
                  id: new mongoose.Types.ObjectId(),
                  name: "Sports",
                  status: true,
                },
                {
                  id: new mongoose.Types.ObjectId(),
                  name: "Games",
                  status: true,
                },
                {
                  id: new mongoose.Types.ObjectId(),
                  name: "Education",
                  status: true,
                },
                {
                  id: new mongoose.Types.ObjectId(),
                  name: "Music",
                  status: true,
                },
              ]

            // Build the Store Db
            const ClientStore = Store.build({
                store_name,
                store_domain: domain,
                clientId: req.currentClient.id,
                network,
                categories,
                ...(type ? {type} : {type: 'marketplace'}),
                ...(type === 'single_store' && {contractStandard: 'combinedContract'}),
                updatedAt: new Date(),
                createdAt: new Date()
            });

            // Save to Db
            await ClientStore.save();

            // Publish an event saying that a client created a store
            new StoreCreatedPublisher(natsWrapper.client).publish({
                clientId: req.currentClient.id,
                store_data: {
                    id: ClientStore.id
                }
            });

            res.status(200).json({ status: true, data: ClientStore, message: "Succesfully created" })
        }
        catch (err) {
            throw new Error();
        }

    }
);



export { router as createStoreRouter };