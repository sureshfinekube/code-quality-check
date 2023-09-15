import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/current-user/require-auth';
import { BadRequestError } from '../../middlewares/custom-err/bad-request-error';
import { User } from '../../models/users';
import { updateListingFee } from '../../utils/axios';

const router = express.Router();

router.put('/',
    currentUser, requireAuth,
    async (req: Request, res: Response) => {

        let {
            listingFee,
        } = req.body;

        console.log(req.body);

        if (!listingFee) throw new BadRequestError('Required params missing')

        let user = await User.findOne({ _id: req.currentUser?.id });

        if (!user) throw new BadRequestError('User not found');

            updateListingFee({storeId: req.store?.storeId, listingFee, metamaskId: user.metamaskId}).then((resp: any) => {
                if (resp?.status) {
                    res.status(200).json(
                        {
                            status: true,
                            message: resp.data.message
                        }
                    );
                }
            }).catch((error) => {
                    res.status(400).json(
                        {
                            status: false,
                            message: error?.message
                        }
                    );
            })

    }
)

export { router as updateListingFee };

