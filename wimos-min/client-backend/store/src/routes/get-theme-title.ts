import {
  BadRequestError,
  currentClient,
  NotAuthorizedError,
  requireAuth,
  validateRequest,
} from "@finekube/nft-client-common";
import express, { Request, Response } from "express";
import { Store } from "../models/store";
import { ThemeTitles } from "../models/theme-titles";

const router = express.Router();

router.get(
  "/",
//   currentClient,
//   requireAuth,
//   validateRequest,
  async (req: Request, res: Response) => {
    // if (!req?.currentClient?.id) {
    //   throw new NotAuthorizedError();
    // }

    try {
      // body
      let storeid = req.query.storeid;
      let type = req.query.type;

      // validate body contents
      if (!storeid || !type)
        throw new BadRequestError("storeId and type are required");

      // Find the store was valid
      let foundStore = await Store.findOne({ _id: storeid });

      // If the store was not found
      if (!foundStore) throw new BadRequestError("Store not found");

      // Validate type
      let validTypes = ["firstSlider"];

      type = type + "";

      if (!validTypes.includes(type)) throw new BadRequestError("Invalid type");

      // fetching if already created
      let fetchTitle = await ThemeTitles.findOne({ storeId: storeid, type });

      res.status(200).json({
        status: true,
        message: "Title fetched successfully",
        data: {
          title: fetchTitle?.title ? fetchTitle?.title : ''
        }
      });
    } catch (err) {
        console.log('errr',err)
      throw new Error();
    }
  }
);

export { router as getThemeTitle };
