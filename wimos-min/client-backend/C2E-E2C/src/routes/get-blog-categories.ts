import { BadRequestError } from "@finekube/nft-client-common";
import express, { Request, Response } from "express";
import { Store } from "../models/store";
import { Blog } from "../models/blogs";
import { checkIdValidation } from "../middlewares/checkId-middleware";
import { validateRequest } from "@finekube/nft-client-common";
import { BlogCategories } from "../models/blog-categories";

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
      let blogCategories = await BlogCategories.find({ storeId: id });

      for (let cat of blogCategories) {
        let blogsUnderThisCategory = await Blog.countDocuments({ categoryId: cat?.id })

        cat.blogs_count = blogsUnderThisCategory ? blogsUnderThisCategory : 0

      }

      //send the response
      return res.status(200).json({
        status: true,
        message: "Blogs fetched successfully",
        data: {
          blogCategories,
        },
      });
    } catch (err) {
      throw new Error();
    }
  }
);

export { router as getBlogCategories };
