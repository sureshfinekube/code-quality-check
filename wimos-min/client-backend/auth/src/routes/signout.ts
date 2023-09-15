import { NotAuthorizedError } from '@finekube/nft-client-common';
import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
    if (req.session?.jwt) {
        req.session = null;
        res.send({ status: true });
    } else throw new NotAuthorizedError();

});

export { router as signoutRouter };