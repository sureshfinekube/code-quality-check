import { BadRequestError, currentClient, NotAuthorizedError, requireAuth, validateRequest } from '@finekube/nft-client-common';
import express, { Request, Response } from 'express';
import { param } from 'express-validator';
import { Store } from '../models/store';
import { CreateApiContract } from '../models/contract';
import { SharedContractAbis } from '../models/shared-contract-abis';

const router = express.Router();

export const mongoIdCheck = [
    param('storeId')
        .isMongoId()
        .withMessage("Id must be valid")
];

// Get A Store with storeId
router.get('/:storeId',
    currentClient, requireAuth,
    mongoIdCheck, validateRequest,
    async (req: Request, res: Response) => {

        if (!req?.currentClient?.id) {
            throw new NotAuthorizedError();
        }

        let { storeId } = req.params;

        try {
            let store = await Store.findById({ _id: storeId }).lean();

            // If Store is not related to this client
            if (store?.clientId !== req?.currentClient.id) {
                throw new NotAuthorizedError();
            };

            // fetching ABIs and contract addresses
            let contractAddresses: any = {}

            if (store.type == 'marketplace') {
                contractAddresses = await CreateApiContract.findOne({ storeId }).sort({ _id: -1 })
            } else if (store.type == 'single_store') {
                contractAddresses = await SharedContractAbis.findOne({type: store?.contractStandard})
            }

            store.chainId = ''

            // console.log('abi____and____caddress',contractAddresses)

            if (contractAddresses?.chainId) {
                store.chainId = contractAddresses.chainId
            }

            if (contractAddresses?.nftContract?.contract_address) {
                store.nftContractAddress = contractAddresses?.nftContract?.contract_address
            } else {
                store.nftContractAddress = ''
            }

            if (contractAddresses?.marketPlaceContract?.contract_address) {
                store.marketplaceContractAddress = contractAddresses?.marketPlaceContract?.contract_address
            } else {
                store.marketplaceContractAddress = ''
            }

            store.id = store._id
            delete store._id
            
            // Send the response
            res.send(store)
        }
        catch (err) {
            throw new Error();
        }

    })

export { router as getStoreRouter };