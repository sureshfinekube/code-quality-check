import { BadRequestError, validateRequest } from '@finekube/nft-client-common';
import express, { Request, Response } from 'express';
import { checkDomainBodyMiddleware } from '../middlewares/check-domain-middleware';
import { Store } from '../models/store';

const router = express.Router();

router.get('/',
    checkDomainBodyMiddleware,
    validateRequest,
    async (req: Request, res: Response) => {
   
        let { domain } = req.query;

        let domainFound = await Store.findOne({ store_domain: domain });

        if (domainFound) throw new BadRequestError('Domain already found');

        res.status(200).json({
            status: true,
            message: "Domain available"
        });

    }
);


export { router as checkDomainRouter }; 