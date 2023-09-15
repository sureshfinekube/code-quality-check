import {
  BadRequestError,
  currentClient,
  NotAuthorizedError,
  requireAuth,
  validateRequest,
} from "@finekube/nft-client-common";
import express, { Request, Response } from "express";
import { updateBlogMiddleware } from "../middlewares/update-middleware";
import { Blog } from "../models/blogs";
import { S3BlogImageUpload } from "../services/s3-image-upload";
import { UploadedFile } from 'express-fileupload';

const router = express.Router();

router.put(
  "/",
  currentClient,
  requireAuth,
  updateBlogMiddleware,
  validateRequest,
  async (req: Request, res: Response) => {
    let {
      id,
      title,
      image_title,
      heading,
      description,
      meta_tags,
      meta_description,
      tags,
      status,
      readTime,
      relatedPosts
    } = req.body;

    let blogFound = await Blog.findOne({ _id: id });

    if (blogFound?.clientId !== req?.currentClient?.id) {
      throw new NotAuthorizedError();
    }

    if (!blogFound) throw new BadRequestError("Blog not found");

    try {
      await Blog.updateOne(
        { _id: id },
        {
          $set: {
            title,
            imageTitle: image_title,
            heading,
            description,
            metaTags: meta_tags,
            metaDescription: meta_description,
            tags,
            status,
            relatedPosts,
            readTime
          },
        }
      );

      if (req?.files?.file) {
        let file = req.files.file as UploadedFile;
        let mimeType = file.mimetype.split("/").reverse()[0];

        // Save the Blog Image to s3 bucket
        let s3ImageUpdload = await S3BlogImageUpload.upload(
          `blogs/${blogFound.storeId}/`,
          id + "." + mimeType,
          file
        );

        let blog = await Blog.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              imageName: id + "." + mimeType,
            },
          },
          { new: true }
        );

        res.status(200).json({
          status: true,
          data: blog,
          message: 'Blog updated successfully'
        });
      } else {
        res.status(200).json({
          status: true,
          message: "Blog updated successfully",
        });
      }
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }
);

export { router as updateBlogRouter };
