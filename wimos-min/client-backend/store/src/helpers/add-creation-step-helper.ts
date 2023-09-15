import { CreationSteps } from "../models/creation-steps";

import { UploadedFile } from "express-fileupload";
import { S3StoreImagesUpload } from "../services/s3-image-upload";

export const addCreationStepHelper = (
  data: any,
  logoFile: any,
  iconFile: any
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { clientId, storeId, title, header, description } = data;

      // Check whether any steps created for this store
      let lastCreatedStep = await CreationSteps.findOne({ storeId }).sort({
        _id: -1,
      });

      let order = 1;
      if (lastCreatedStep) {
        order = lastCreatedStep.order + 1;
      }

      // Build the Step to Db
      const creationStepsData = CreationSteps.build({
        clientId: clientId,
        storeId,
        title,
        header,
        description,
        order,
      });

      // Save to Db
      let creationStepsSavedData = await creationStepsData.save();

      // Add the step logo to s3 bucket and update the db
      let sLogoFile = logoFile as UploadedFile;
      let sLogoMimeType = sLogoFile.mimetype.split("/").reverse()[0];
      let sLogoRandomFileName =
        "step-logo_" +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

      await S3StoreImagesUpload.upload(
        `store/${storeId}/creation-steps/`,
        `${sLogoRandomFileName}.${sLogoMimeType}`,
        sLogoFile
      )
        .then(async () => {
          await CreationSteps.updateOne(
            {
              _id: creationStepsSavedData._id,
            },
            {
              $set: {
                stepLogo: `creation-steps/${sLogoRandomFileName}.${sLogoMimeType}`,
              },
            }
          );

          if (iconFile) {
            // Add the navigationIcon to s3 bucket and update the db
            let nIconFile = iconFile as UploadedFile;
            let nIconMimeType = nIconFile.mimetype.split("/").reverse()[0];
            let nIconRandomFileName =
              "step-icon_" +
              Math.random().toString(36).substring(2, 15) +
              Math.random().toString(36).substring(2, 15);

            let secondImageUpload = await S3StoreImagesUpload.upload(
              `store/${storeId}/creation-steps/`,
              `${nIconRandomFileName}.${nIconMimeType}`,
              nIconFile
            )
              .then(async () => {
                await CreationSteps.updateOne(
                  {
                    _id: creationStepsSavedData._id,
                  },
                  {
                    $set: {
                      navigationIcon: `creation-steps/${nIconRandomFileName}.${nIconMimeType}`,
                    },
                  }
                );

                resolve({ status: true });
              })
              .catch(async (error) => {
                // console.log("AWS_ERROR 2 :- ", error);

                await creationStepsSavedData.deleteOne({
                  _id: creationStepsSavedData._id,
                });

                reject('Image upload error');
              });
          } else {
            resolve({ status: true });
          }
        })
        .catch(async (error) => {
          // console.log("AWS_ERROR 1:- ", error);

          await creationStepsSavedData.deleteOne({
            _id: creationStepsSavedData._id,
          });

          reject('Image upload error')
        });
    } catch (error) {
      // throw new Error();
      console.log("helper catch");
      reject(error);
    }
  });
};
