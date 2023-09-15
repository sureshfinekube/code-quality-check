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

router.post('/',
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

        if (!req.currentUser?.id || !req.store?.storeId) throw new BadRequestError('Permission denied');

        // fetch user details
        let userDetails = await User.findOne({ _id: req.currentUser.id })

        // check whether it is shared contract store (if it is shared, check whether the owner is the minter)
        if (req.store.type === 'single_store') {
            if (userDetails?.metamaskId !== req.store.metamaskId) {
                throw new BadRequestError('Sorry, only store owner can create collection from this store');
            }
        }

        let findCollection = await Collection.findOne({ name: name, storeId: req.store?.storeId });

        if (findCollection) throw new BadRequestError('Collection name already exist');

        if (!req?.files?.profile || !req?.files?.banner) throw new BadRequestError('Banner and profile images is required');


        let buildCollection = Collection.build({
            userId: req.currentUser.id,
            storeId: req.store.storeId,
            name,
            description,
            category,
            bannerImage: "",
            profileImage: "",
            url,
            royalities
        });

        await buildCollection.save();

        let profile = req.files.profile as UploadedFile;
        let banner = req.files.banner as UploadedFile;
        let bannerMimeType = banner.mimetype.split('/').reverse()[0];
        let profileMimeType = profile.mimetype.split('/').reverse()[0];

        try {
            let ProfileImageUpload = await S3ImageUpload.upload('collection/', "p" + buildCollection.id + "." + profileMimeType, profile);
            let BannerImageUpload = await S3ImageUpload.upload('collection/', 'b' + buildCollection.id + "." + bannerMimeType, banner);

            let updatedCollection = await Collection.findOneAndUpdate(
                { _id: buildCollection.id },
                {
                    $set: {
                        bannerImage: "b" + buildCollection.id + "." + bannerMimeType,
                        profileImage: "p" + buildCollection.id + "." + profileMimeType
                    }
                },
                {
                    new: true
                }
            );

            res.status(200).json({
                status: true,
                data: updatedCollection
            })
        }
        catch (err) {
            console.log(err);
            throw new Error();
        }

    }
);

export { router as createCollectionRouter };