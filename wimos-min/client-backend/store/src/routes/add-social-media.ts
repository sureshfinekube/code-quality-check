import { BadRequestError, currentClient, requireAuth, validateRequest } from "@finekube/nft-client-common";
import express, { Request, Response } from "express";
import path from 'path';
import { addSocialMediaMiddleware } from "../middlewares/add-social-media-middleware";
import { Store } from "../models/store";

import { UploadedFile } from "express-fileupload";
import { S3StoreImagesUpload } from "../services/s3-image-upload";

import { SocialMedia } from "../models/social-medias";

const router = express.Router();

router.post(
  "/",
  currentClient,
  requireAuth,
  addSocialMediaMiddleware,
  validateRequest,
  async (req: Request, res: Response) => {
    // body
    let { storeId, name, link } = req.body;

    // Find the store was valid
    let foundStore = await Store.findOne({ _id: storeId });

    // If the store was not found
    if (!foundStore) throw new BadRequestError("Store not found");

    if (!req.files?.image) throw new BadRequestError("Image is required");

    try {
      // Add the logo to s3 bucket and update the db
      let file = req.files.image as UploadedFile;
      //   let mimeType = file.mimetype.split("/").reverse()[0];
      let mimeType = path.extname(file.name); // fetch the file extension

      let random6DigitNumber = Math.floor(100000 + Math.random() * 900000);

      let filename = "social_media" + random6DigitNumber + "." + mimeType;

      S3StoreImagesUpload.upload(`store/${storeId}/`, filename, file)
        .then(async (resp) => {
          let socialMediaBuild = SocialMedia.build({
            storeId,
            clientId: req.currentClient?.id,
            name,
            link,
            image: filename,
          });

          await socialMediaBuild.save();

          return res.json({ status: true, message: "success" });
        })
        .catch((error) => {
          console.log("AWS_ERROR :- ", error);
          return res.status(400).json({
            errors: [{
              message: "Error while saving image"
            }]
          })
        });
    } catch (err) {
      // end try
      throw new Error();
    }
  }
);

export { router as addSocialMediaLinkRouter };
