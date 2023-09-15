import express, { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { validateRequest } from '../../middlewares/controller-middleware-validator/request-validate';
import { createCollectionValidation } from '../../middlewares/controller-middlewares/create-collection-middleware';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/current-user/require-auth';
import { BadRequestError } from '../../middlewares/custom-err/bad-request-error';
import { Collection } from '../../models/collections';
import { NftCollection } from '../../models/nfts';
import { User } from '../../models/users';

const router = express.Router();

router.delete('/:id',
    currentUser, requireAuth,
    validateRequest,
    async (req: Request, res: Response) => {

        let {id} = req.params

        if (!req.currentUser?.id || !req.store?.storeId || !req.params?.id) throw new BadRequestError('Permission denied');

        // fetch user details
        let userDetails = await User.findOne({ _id: req.currentUser.id })

        // check whether it is shared contract store (if it is shared, check whether the owner is the minter)
        if (req.store.type === 'single_store') {
            if (userDetails?.metamaskId !== req.store.metamaskId) {
                throw new BadRequestError('Sorry, only store owner can do this process');
            }
        }

        // Check whether id is valid
        let findCollection = await Collection.findOne({ _id: id, storeId: req.store?.storeId });
        if (!findCollection) throw new BadRequestError('Invalid collection id');

        // Check if any NFTs exist under this collection
        let isNftExists = await NftCollection.findOne({collectionId: id})

        if (isNftExists) throw new BadRequestError('Unable to process: NFT exists under this collection');

        try {
            await Collection.deleteOne({_id: id});
            
            res.status(200).json({
                status: true,
                message: 'Collection deleted successfully'
            })
        } catch (err) {
            throw new Error();
        }
        
    }
);

export { router as deleteCollectionRouter };