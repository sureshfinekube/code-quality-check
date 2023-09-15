import express, { Request, Response } from 'express';
import { validateRequest } from '../../middlewares/controller-middleware-validator/request-validate';
import { updateProfileValidator } from '../../middlewares/controller-middlewares/update-profile-middleware';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/current-user/require-auth';
import { BadRequestError } from '../../middlewares/custom-err/bad-request-error';
import { User } from '../../models/users';
import { S3ImageUpload } from '../../services/s3-image-upload';
import { UploadedFile } from 'express-fileupload';


const router = express.Router();


interface UpdateQueryInterface {
    name?: string;
    username?: string;
    email?: string;
    bio?: string;
}

router.put('/',
    currentUser, requireAuth,
    updateProfileValidator, validateRequest,
    async (req: Request, res: Response) => {

        let {
            name,
            email,
            username,
            bio
        } = req.body;

        console.log(req.body);
        

        let user = await User.findOne({ _id: req.currentUser?.id });

        if (!user) throw new BadRequestError('User not found');

        if (!name && !email && !username && !bio) throw new BadRequestError('Nothing to update');

        let updateQuery: UpdateQueryInterface = {};
        if (name) updateQuery.name = name;
        if (email) updateQuery.email = email;
        if (username) updateQuery.username = username;
        if (bio) updateQuery.bio = bio;

        try {
            let updatedUser = await User.findOneAndUpdate(
                {
                    _id: req.currentUser?.id
                },
                updateQuery,
                {
                    new: true
                }
            ).exec();

            res.status(200).json(
                {
                    status: true,
                    data: updatedUser
                }
            );

        }
        catch (err) {
            console.log(err);
            throw new Error();
        }

    }
)

export { router as updateProfileRouter };

