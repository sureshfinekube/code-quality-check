import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/current-user/require-auth';
// import marketPlaceContract from './marketplace-contract.json';
// import nftContract from './nft-contract.json';
import { getContractByDomain } from '../../utils/axios';

const router = express.Router();

router.get('/',
    async (req: Request, res: Response) => {
        try {
            console.log('in function')
            const domain: string = req.store?.domain as string;
            let { data } = await getContractByDomain(domain);

            let { contract } = data?.data

            return res.status(200).json({
                status: true,
                data: contract
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error+''
            })
        }
        // res.json({
        //     nftContract,
        //     marketPlaceContract
        // })
    }
);

export { router as getContractDataRouter };