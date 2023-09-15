import express, { Request, Response } from 'express';
import { Blog } from '../models/blogs';
import { BadRequestError, currentClient, NotAuthorizedError, requireAuth, validateRequest } from '@finekube/nft-client-common'
import { validMongoIdMiddleware } from '../middlewares/valid-mongo-id-middleware';
const router = express.Router();

router.get('/:id',
    currentClient,
    requireAuth,
    validMongoIdMiddleware,
    validateRequest,

    async (req: Request, res: Response) => {

            let { id } = req.params;
            let blog = await Blog.findOne({ _id: id });

            if (!blog) {
                throw new BadRequestError('Blog not found');
            }

            if (blog?.clientId !== req?.currentClient?.id) {
                throw new NotAuthorizedError();
            };

            res.status(200).json({
                status: true,
                data: blog
            });
       


    });

export { router as getBlogRouter };