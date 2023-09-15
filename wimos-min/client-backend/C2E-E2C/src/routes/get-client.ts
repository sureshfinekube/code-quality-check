import { BadRequestError, validateRequest } from '@finekube/nft-client-common';
import express, { Request, Response } from 'express';
import { checkIdValidation } from '../middlewares/checkId-middleware';
import { Billing } from '../models/billings';
import { Client } from '../models/client';
const router = express.Router();


router.get('/:id',
    checkIdValidation, validateRequest,
    async (req: Request, res: Response) => {
        let { id } = req.params;

        let client = await Client.findById(id);

        if (!client) throw new BadRequestError('Client not found');

        let billingData = await Billing.findOne({ clientId: client._id, status: true });

        res.json({ status: true, data: { client, billingData } });
    }
);


export { router as getClientRouter };