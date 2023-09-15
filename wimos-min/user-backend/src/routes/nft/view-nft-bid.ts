import express, { Request, Response } from 'express';
import { validateRequest } from '../../middlewares/controller-middleware-validator/request-validate';
import { validateNftId } from '../../middlewares/controller-middlewares/nftId-middleware';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/current-user/require-auth';
import { BadRequestError } from '../../middlewares/custom-err/bad-request-error';
import { NotAuthorizedError } from '../../middlewares/custom-err/not-authorized-error';
import { Bid } from '../../models/bids';
import { NftCollection } from '../../models/nfts';

const router = express.Router();

router.get('/:nftId',
    currentUser, requireAuth,
    validateNftId, validateRequest,
    async (req: Request, res: Response) => {

        if (!req.currentUser?.id) throw new NotAuthorizedError();
        if (!req.store?.storeId) throw new NotAuthorizedError();

        let { nftId } = req.params;

        // Finding the nft
        let nft = await NftCollection.findById(nftId);
        if (!nft) throw new BadRequestError('Nft not found');

        // If the view request is not from the owner of the nft
        if (nft.userId.includes(req.currentUser.id)) throw new BadRequestError('you have no permission to view the bids of this nft');

        // Find the bids
        let bidsOfNft = await Bid.find({ nftId }).exec();

        // Send the response
        res.json({
            status: true,
            data: bidsOfNft,
        })

    }

);


export { router as viewNftBidsRouter };