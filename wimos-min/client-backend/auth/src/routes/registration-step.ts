import {  currentClient, NotAuthorizedError, requireAuth, validateRequest } from '@finekube/nft-client-common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Client } from '../models/client';

const router = express.Router();

const ValidNumberCheck = [
    body('step')
        .isNumeric()
        .withMessage('Only number allowed')
];


router.put('/',
    currentClient, requireAuth,
    ValidNumberCheck, validateRequest,
    async (req: Request, res: Response) => {
        let { step } = req.body;

        let clientId = req.currentClient?.id;

        if (!clientId) throw new NotAuthorizedError();

        try {

            let client = await Client.findByIdAndUpdate(
                clientId,
                {
                    $set: {
                        currentStep: step
                    }
                },
                {
                    new: true
                }
            );

            res.json({ status: true, data: client });
        }
        catch (err) {
            throw new Error();
        }

    }
);


export { router as updateRegistrationStepRouter }