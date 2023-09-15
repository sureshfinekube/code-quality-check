import { BadRequestError, currentClient, NotAuthorizedError, requireAuth, validateRequest } from '@finekube/nft-client-common';
import express, { Request, Response } from 'express';
import { validMongoIdMiddleware } from '../middlewares/valid-mongo-id-middleware';
import { Blog } from '../models/blogs';
const router = express.Router();

// For Removing a blog - DELETE Request
router.delete('/:id',
    currentClient,
    requireAuth,
    validMongoIdMiddleware,
    validateRequest,
    async (req: Request, res: Response) => {
        let { id } = req.params;

        // Finding the Blog
        let blog = await Blog.findOne({ _id: id });

        if (blog.clientId !== req?.currentClient?.id) {
            throw new NotAuthorizedError();
        }


        if (!blog) throw new BadRequestError('Blog not found');

        // Removing a Blog with matched Id 
        await Blog.deleteOne({ _id: id });

        res.status(200).json({
            status: true
        });
    });

export { router as removeBlogRouter };