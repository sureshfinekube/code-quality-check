import { validateRequest, BadRequestError, requireAuth, currentClient, NotAuthorizedError } from '@finekube/nft-client-common';
import express, { Request, Response } from 'express';
import { blogMiddleware } from '../middlewares/blog-middleware';
import { Blog } from '../models/blogs';
import { Stores } from '../models/stores'
import { S3BlogImageUpload } from '../services/s3-image-upload';
import 'express-async-errors';
import { UploadedFile } from 'express-fileupload';

const router = express.Router();

router.post('/',
    currentClient, requireAuth,
    blogMiddleware, validateRequest,

    async (req: Request, res: Response) => {

        let {
            client_id,
            store_id,
            title,
            image_title,
            heading,
            description,
            meta_tags,
            meta_description,
            tags,
            status,
            relatedPosts,
            readTime,
            categoryId
        } = req.body;


        if (req?.currentClient?.id !== client_id) {
            throw new NotAuthorizedError();
        };


        let findStoreAndClient = await Stores.findOne({ clientId: client_id, storeId: store_id });

        if (!findStoreAndClient) throw new BadRequestError('Store and client not found');


        let buildBlog = Blog.build({
            clientId: client_id,
            storeId: store_id,
            title: title,
            imageTitle: image_title,
            heading: heading,
            description: description,
            metaTags: meta_tags,
            metaDescription: meta_description,
            tags: tags,
            status: status,
            relatedPosts,
            readTime,
            categoryId
        });

        // Save to Db
        await buildBlog.save();

        if (req?.files?.file) {
            let file = req.files.file as UploadedFile;
            let mimeType = file.mimetype.split('/').reverse()[0]

            try {
                // Save the Blog Image to s3 bucket
                let s3ImageUpdload = await S3BlogImageUpload.upload(`blogs/${store_id}/`, buildBlog.id + "." + mimeType, file);

                let blog = await Blog.findOneAndUpdate(
                    { _id: buildBlog.id },
                    {
                        $set: {
                            imageName: buildBlog.id + "." + mimeType
                        }
                    },
                    { new: true }
                );

                res.status(200).json({
                    status: true,
                    data: blog
                });


            }
            catch (err) {
                throw new Error();
            }


        } else {
            res.status(200).json({
                status: true
            });
        }

    });

export { router as createBlogRouter };