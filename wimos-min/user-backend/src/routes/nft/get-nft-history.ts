import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { validateRequest } from '../../middlewares/controller-middleware-validator/request-validate';
import { getANftValidation } from '../../middlewares/controller-middlewares/get-a-nft-middleware';
import { BadRequestError } from '../../middlewares/custom-err/bad-request-error';
import { NftCollection } from '../../models/nfts';
import { NftHistory } from '../../models/nft-history';

const router = express.Router();


router.get('/:id',
    getANftValidation, validateRequest,
    async (req: Request, res: Response) => {

        try {
            if (!req.store?.storeId) throw new BadRequestError('Store not found');
    
            let { id } = req.params;
    
            let history = await NftHistory.findOne({ nftId: id }).populate({ path: 'events.userId', select: ['name','username','email','profile'] }).populate({ path: 'events.previousOwnerId', select: ['name','username','email','profile'] })

            let responseHistory: any = []

            if (history) {
                responseHistory = history?.events
            }

            res.status(200).json({
                status: true,
                message: 'Nft history are',
                data: {
                    history: responseHistory
                }
            })

        } catch (error) {
            console.log('errrr',error)
            throw new Error()
            
        }
    }
);


export { router as getNftHistory };