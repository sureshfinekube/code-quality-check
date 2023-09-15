import {
  validateRequest,
  BadRequestError,
  requireAuth,
  currentClient,
  NotAuthorizedError,
} from "@finekube/nft-client-common";
import express, { Request, Response } from "express";
import { Stores } from "../models/stores";
import "express-async-errors";
import { BlogCategories } from "../models/blog-categories";
import { blogCategoryMiddleware } from "../middlewares/blog-category-middleware";

const router = express.Router();

router.post(
  "/",
  currentClient,
  requireAuth,
  blogCategoryMiddleware,
  validateRequest,

  async (req: Request, res: Response) => {
    let { store_id, title } = req.body;

    let findStoreAndClient = await Stores.findOne({
      clientId: req.currentClient?.id,
      storeId: store_id,
    });

    if (!findStoreAndClient)
      throw new BadRequestError("Store and client not found");

    // already existing name checking
    let isAlreadyExits = await BlogCategories.findOne({ title });
    if (isAlreadyExits) throw new BadRequestError("Tittle already exists");

    let buildBlogCategory = BlogCategories.build({
      clientId: req.currentClient?.id,
      storeId: store_id,
      title: title,
    });

    // Save to Db
    let category = await buildBlogCategory.save();

    res.status(200).json({
      status: true,
      data: category,
    });
  }
);

export { router as createBlogCategoryRouter };
