import express, { Request, Response } from 'express';

const router = express.Router();


router.get('/',
    async (req: Request, res: Response) => {

        res.json({
            status: true,
            data: req.store
        });

    }
);


export { router as getCurrentStore };