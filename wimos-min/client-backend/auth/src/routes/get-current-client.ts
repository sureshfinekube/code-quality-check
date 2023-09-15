import express from 'express';
import { currentClient, requireAuth } from '@finekube/nft-client-common';
import { Client } from '../models/client';

const router = express.Router();

router.get('/',
    currentClient, requireAuth,
    async (req, res) => {

        // Get Client Data
        const client = await Client.findOne({ _id: req.currentClient?.id });

        res.send({ currentClient: client || null })
    }
);

export { router as currentClientRouter };