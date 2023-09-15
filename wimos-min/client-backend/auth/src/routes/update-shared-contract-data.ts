import { currentClient, NotAuthorizedError, requireAuth, validateRequest } from '@finekube/nft-client-common';
import express, { Request, Response } from 'express';
import { Client } from '../models/client';
import { updateSharedContractMiddleware } from '../middlewares/update-shared-contract-middleware';
import { SharedContractAbis } from '../models/shared-contract-abis';

const router = express.Router();

router.put('/',
    // currentClient, requireAuth,
    updateSharedContractMiddleware, validateRequest,
    async (req: Request, res: Response) => {

        // if (!req?.currentClient?.id) {
        //     throw new NotAuthorizedError();
        // };

        let {
            type,
            marketPlaceAbi,
            nftAbi,
            marketplaceContractAddress,
            nftContractAddress,
            chainId
        } = req.body;

        // // Check the client is there
        // let client = await Client.findById({ _id: req.currentClient.id });

        // if (!client) {
        //     throw new Error();
        // };

        let marketPlaceContract = {
            contract_address: marketplaceContractAddress,
            abi: marketPlaceAbi
        }

        let nftContract = {
            contract_address: nftContractAddress,
            abi: nftAbi
        }

        // Updating the shared contract
        SharedContractAbis.findOneAndUpdate(
            { type },
            {
                $set: {
                    marketPlaceContract,
                    nftContract,
                    chainId
                }
            },
            { new: true }
        )
            .then((data: any) => {
                res.json(
                    { status: true, data, message: 'Contract updated successfully' }
                );
            })
            .catch((err: any) => {
                throw new Error();
            })

    }
);


export { router as updateSharedContractData };

