import { BadRequestError } from "@finekube/nft-client-common";
import express, { Request, Response } from "express";
import { Store } from "../models/store";
import { Blog } from "../models/blogs";
import { checkIdValidation } from "../middlewares/checkId-middleware";
import { validateRequest } from "@finekube/nft-client-common";

const router = express.Router();

router.get(
  "/",
  // checkIdValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      // body
      let { id, category } = req.query as any;

      if (!id) throw new BadRequestError("Required params missing");

      // Finding the store with the domain
      let store = await Store.findOne({ _id: id });

      // If store not found
      if (!store) throw new BadRequestError("Store not found");

      // Fetching blogs of the store
      let blogs = await Blog.aggregate([
        {
          $match: { 
            storeId: id,
            ...(category.match(/^[0-9a-fA-F]{24}$/) && {categoryId: category})
          },
        },
        // {
        //   $lookup: {
        //     from: 'blogs',
        //     let: { "rpIds": "$relatedPosts" },
        //     pipeline: [{ "$match": { "$expr": { "$in": ["$_id", "$$rpIds"] }}}],
        //     // localField: 'relatedPosts',
        //     // foreignField: '_id',
        //     as: 'rp'
        //   }
        // },
        // {
        //   $addFields: {
        //     relatedPosts: {
        //       $map: {
        //         input: "$relatedPosts",
        //         as: "rpId",
        //         in: {
        //           $convert: {
        //             input: "$$rpId",
        //             to: "objectId"
        //           }
        //         }
        //       }
        //     },
        //   },
        // },
        // {
        //   $lookup: {
        //     from: "Blogs",
        //     localField: "relatedPosts",
        //     foreignField: "_id",
        //     as: "rps",
        //   },
        // },
      ]);
      
      // blogs = blogs.map((i,k) => (
      //   i.relatedPosts = []
      // ))

      // // Fetching related posts
      for (let i of blogs) {
        let relatedPost = await Blog.find({ _id: {$in: i.relatedPosts } }, { title: 1, imageTitle: 1, imageName: 1, heading: 1 })
        i.relatedPosts = relatedPost
        i.id = i._id
        delete i._id
        i.recentPosts = relatedPost
      }

      //send the response
      return res.status(200).json({
        status: true,
        message: "Blogs fetched successfully",
        data: {
          blogs,
        },
      });
    } catch (err) {
      console.log("errooo", err);
      throw new Error();
    }
  }
);

export { router as getBlogs };
