import express, { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/current-user/require-auth';
import { BadRequestError } from '../../middlewares/custom-err/bad-request-error';
import { User } from '../../models/users';
import { S3ImageUpload } from '../../services/s3-image-upload';

const router = express.Router();

router.put('/',
    currentUser, requireAuth,
    async (req: Request, res: Response) => {

        let user = await User.findOne({ _id: req.currentUser?.id });

        if (!user) throw new BadRequestError('User not found');

        if (!req.files?.profile && !req.files?.cover) throw new BadRequestError('Nothing to update');

        var updatedUser;

        if (req?.files?.profile) {
            let profile = req.files.profile as UploadedFile;
            let profileMimeType = profile.mimetype.split('/').reverse()[0];
            let profileImageUpload = await S3ImageUpload.upload('user/', `p${user.id}.${profileMimeType}`, profile);
            updatedUser = await User.findOneAndUpdate(
                {
                    _id: req.currentUser?.id
                },
                {
                    $set: {
                        profile: `p${user.id}.${profileMimeType}`,
                        updatedAt: new Date()
                    }
                },
                {
                    new: true
                }
            ).exec();
        };

        if (req?.files?.cover) {
            let cover = req.files.cover as UploadedFile;
            let coverMimeType = cover.mimetype.split('/').reverse()[0];
            let coverImageUpload = await S3ImageUpload.upload('user/', `c${user.id}.${coverMimeType}`, cover);
            updatedUser = await User.findOneAndUpdate(
                {
                    _id: req.currentUser?.id
                },
                {
                    $set: {
                        cover: `c${user.id}.${coverMimeType}`,
                        updatedAt: new Date()
                    }
                },
                {
                    new: true
                }
            ).exec();
        }

        res.status(200).json({
            status: true,
            data: updatedUser
        });
    }
);


export { router as updateProfileImageRouter };