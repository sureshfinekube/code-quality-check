import {
  currentClient,
  NotAuthorizedError,
  requireAuth,
  validateRequest,
} from "@finekube/nft-client-common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Store } from "../models/store";

const router = express.Router();

const ValidBody = [
  body("step").isNumeric().withMessage("Only number allowed"),
  body("storeId").isMongoId().withMessage("storeId is missing or invalid"),
];

router.put(
  "/",
  currentClient,
  requireAuth,
  ValidBody,
  validateRequest,
  async (req: Request, res: Response) => {
    let { step, storeId } = req.body;

    let clientId = req.currentClient?.id;

    if (!clientId) throw new NotAuthorizedError();

    try {
      let store = await Store.findOneAndUpdate(
        {
          _id: storeId,
          clientId,
        },
        {
          $set: {
            currentStep: step,
          },
        },
        {
          new: true,
        }
      );

      if (!store) {
        return res.status(400).json({
          errors: [
            {
              message: "Invalid storeId",
            },
          ],
        });
      }

      res.status(200).json({ status: true, data: store });
    } catch (err) {
      throw new Error();
    }
  }
);

export { router as updateStoreStep };
