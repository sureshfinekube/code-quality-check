import express, { Request, Response } from "express";
import { Collection } from "../../models/collections";
import { NftCollection } from "../../models/nfts";
import { currentUser } from "../../middlewares/current-user";
import { User } from "../../models/users";

const router = express.Router();

router.get("/", currentUser, async (req: Request, res: Response) => {
  // let collections = await Collection.find({ storeId: req.store?.storeId }).exec();

  let collections = await Collection.aggregate([
    {
      $match: {
        $and: [
          {
            storeId: req.store?.storeId,
          },
          {
            $or: [
              {
                userId: req.currentUser?.id,
              },
              {
                isHidden: false,
              },
              {
                $expr: {
                  $eq: [
                    {
                      $type: "$isHidden"
                    },
                    "missing"
                  ]
                },
              },
            ],
          },
        ],
      },
    },
    {
      $addFields: {
        _id: { $toString: "$_id" },
      },
    },
    {
      $lookup: {
        from: "nfts",
        localField: "_id",
        foreignField: "collectionId",
        as: "count",
      },
    },
    {
      $addFields: {
        count: { $size: "$count" },
        id: "$_id",
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  // let nftCount = await NftCollection.countDocuments({ collectionId: })

  res.json({
    status: true,
    data: collections,
  });
});

export { router as getAllCollectionsRouter };
