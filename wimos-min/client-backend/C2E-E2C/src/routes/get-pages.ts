import { BadRequestError } from "@finekube/nft-client-common";
import express, { Request, Response } from "express";
import { Store } from "../models/store";
import { Pages } from "../models/pages";
import { checkIdValidation } from "../middlewares/checkId-middleware";
import { validateRequest } from "@finekube/nft-client-common";

const router = express.Router();

router.get(
  "/:id",
  checkIdValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      // body
      let { id } = req.params;

      if (!id) throw new BadRequestError("Required params missing");

      // Finding the store with the domain
      let store = await Store.findOne({ _id: id });

      // If store not found
      if (!store) throw new BadRequestError("Store not found");

      // Fetching blogs of the store
      let pages = await Pages.find({ storeId: id });

      //send the response
      return res.status(200).json({
        status: true,
        message: "Pages fetched successfully",
        data: {
          pages,
        }
      });
    } catch (err) {
      console.log("errooo", err);
      throw new Error();
    }
  }
);

export { router as getPages };
