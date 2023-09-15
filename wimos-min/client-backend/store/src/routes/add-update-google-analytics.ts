import {
  BadRequestError,
  currentClient,
  NotAuthorizedError,
  requireAuth,
  validateRequest,
} from "@finekube/nft-client-common";
import express, { Request, Response } from "express";
import { createStoreBodyValidator } from "../middlewares/create-store-middleware";
import { Client } from "../models/clients";
import { Store } from "../models/store";
import { updateGAdataBodyValidator } from "../middlewares/add-update-ga-data-middleware";

const router = express.Router();

// Create Store Route - POST
router.post(
  "/",
  currentClient,
  requireAuth,
  updateGAdataBodyValidator,
  validateRequest,

  async (req: Request, res: Response) => {
    if (!req?.currentClient?.id) {
      throw new NotAuthorizedError();
    }

    // Get the required bodies from the request
    let { storeId, trackingId } = req.body;

    // Check the Client id is valid
    const client = await Client.findOne({ clientId: req.currentClient.id });
    if (!client) throw new BadRequestError("Client not registered");

    // Check the store id is valid
    const isValidStore = await Store.findOne({
      _id: storeId,
    });

    if (!isValidStore) throw new BadRequestError("Invalid storeId");

    try {
      // Save to Db
      await Store.updateOne(
        { _id: storeId },
        {
          $set: {
            gaTrackingId: trackingId,
          },
        }
      );

      res
        .status(200)
        .json({ status: true, message: "Tracking Id successfully updated" });
    } catch (err) {
      throw new Error();
    }
  }
);

export { router as addOrUpdateGoogleAnalyticsData };
