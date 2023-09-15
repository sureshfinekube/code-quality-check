import express, { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { validateRequest } from '../../middlewares/controller-middleware-validator/request-validate';
import { hideCollectionValidation } from '../../middlewares/controller-middlewares/hide-collection-middleware';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/current-user/require-auth';
import { BadRequestError } from '../../middlewares/custom-err/bad-request-error';
import { Collection } from '../../models/collections';
import { S3ImageUpload } from '../../services/s3-image-upload';
import { User } from '../../models/users';

const router = express.Router();

router.put('/:id',
    currentUser, requireAuth,
    hideCollectionValidation, validateRequest,
    async (req: Request, res: Response) => {

        let {
            hide
        } = req.body;

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

        console.log("req.store?.storeId::",req.store?.storeId)
        let findCollection = await Collection.findOne({ _id: id, storeId: req.store?.storeId });

        if (!findCollection) throw new BadRequestError('Invalid collection id');

        try {
            
            await Collection.updateOne({_id: id}, {
                $set: {
                    isHidden: hide
                }
            });
            
            res.status(200).json({
                status: true,
                message: `Collection successfully ${hide === true ? 'hide' : 'unhide'}`
            })
        }
        catch (err) {
            throw new Error();
        }

    }
);

export { router as hideCollectionRouter };