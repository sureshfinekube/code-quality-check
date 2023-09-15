import express, { Request, Response } from 'express';
import { validateRequest } from '../../middlewares/controller-middleware-validator/request-validate';
import { validateNftIdMiddleware } from '../../middlewares/controller-middlewares/validate-nft-id';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/current-user/require-auth';
import { BadRequestError } from '../../middlewares/custom-err/bad-request-error';
import { NotAuthorizedError } from '../../middlewares/custom-err/not-authorized-error';
import { NftCollection } from '../../models/nfts';

const router = express.Router();

router.delete('/',
    currentUser, requireAuth,
    validateNftIdMiddleware, validateRequest,
    async (req: Request, res: Response) => {

        if (!req.store?.storeId) throw new BadRequestError('Store not found');
        if (!req.currentUser?.id) throw new NotAuthorizedError();

        let { nftId } = req.body;

        // Find the nft
        let nft = await NftCollection.findById(nftId);

        // If nft not found
        if (!nft) throw new BadRequestError('Nft not found');

        if(!nft.userId.includes(req.currentUser.id)) throw new BadRequestError('Permission denied');

        // Remove nft
        await NftCollection.deleteOne({ _id: nftId }).exec();

        // Send response
        res.json({
            status: true,
            message: "Nft deleted successfully"
        });

    }
)

export { router as burnNftRouter };