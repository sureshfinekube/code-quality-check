import express, { Request, Response } from "express";
import { Collection } from "../../models/collections";
import { randomArrPicker } from "../../services/randomArrPicker";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
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
                      $type: "$isHidden",
                    },
                    "missing",
                  ],
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

  let topCollections = randomArrPicker(5, collections);

  res.json({
    status: true,
    data: topCollections,
  });
});

export { router as getTopCollectionsRouter };
