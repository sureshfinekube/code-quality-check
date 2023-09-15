import express, { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { validateRequest } from '../../middlewares/controller-middleware-validator/request-validate';
import { createCollectionValidation } from '../../middlewares/controller-middlewares/create-collection-middleware';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/current-user/require-auth';
import { BadRequestError } from '../../middlewares/custom-err/bad-request-error';
import { Collection } from '../../models/collections';
import { S3ImageUpload } from '../../services/s3-image-upload';
import { User } from '../../models/users';

const router = express.Router();

router.put('/:id',
    currentUser, requireAuth,
    createCollectionValidation, validateRequest,
    async (req: Request, res: Response) => {

        let {
            name,
            description,
            url,
            category,
            royalities
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

        let findCollection = await Collection.findOne({ _id: id, storeId: req.store?.storeId });

        if (!findCollection) throw new BadRequestError('Invalid collection id');

        let updatedCollection: any = await Collection.updateOne({_id: id}, {
            $set: {
                name,
                description,
                category,
                url,
                royalities
            }
        });

        try {
            if (req.files?.profile) {
                let profile = req.files.profile as UploadedFile;
                let profileMimeType = profile.mimetype.split('/').reverse()[0];

                await S3ImageUpload.upload('collection/', "p" + id + "." + profileMimeType, profile);

                updatedCollection = await Collection.findOneAndUpdate(
                    { _id: id },
                    {
                        $set: {
                            profileImage: "p" + id + "." + profileMimeType
                        }
                    },
                    {
                        new: true
                    }
                );
            }

            if (req.files?.banner) {
                let banner = req.files?.banner as UploadedFile;
                let bannerMimeType = banner.mimetype.split('/').reverse()[0];

                await S3ImageUpload.upload('collection/', 'b' + id + "." + bannerMimeType, banner);

                updatedCollection = await Collection.findOneAndUpdate(
                    { _id: id },
                    {
                        $set: {
                            bannerImage: "b" + id + "." + bannerMimeType,
                        }
                    },
                    {
                        new: true
                    }
                );
            }


            res.status(200).json({
                status: true,
                message: 'Collection updated successfully'
            })
        }
        catch (err) {
            console.log(err);
            throw new Error();
        }

    }
);

export { router as updateCollectionRouter };