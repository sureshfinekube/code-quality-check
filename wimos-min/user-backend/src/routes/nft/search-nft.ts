import express, { Request, Response } from "express";
import { BadRequestError } from "../../middlewares/custom-err/bad-request-error";
import { NftCollection } from "../../models/nfts";
import { User } from "../../models/users";
import { Collection } from "../../models/collections";
import { currentUser } from "../../middlewares/current-user";
import mongoose from 'mongoose';

const router = express.Router();

router.post("/", currentUser, async (req: Request, res: Response) => {
  if (!req.store?.storeId) throw new BadRequestError("Store not found");

  // let nfts = await NftCollection.find(
  //     { storeId: req.store?.storeId }
  // ).exec();

  let { keyword, collectionFilter, priceFilter } = req.body;

  if (!keyword) throw new BadRequestError("Required params missing");

  try {
    // searching in users
    let users = await User.aggregate([
      {
        $match: {
          storeId: req.store?.storeId,
          _id: { $ne: new mongoose.Types.ObjectId(req.currentUser?.id) },
          ...(keyword &&
            keyword !== "" && {
              name: { $regex: `${keyword}`, $options: "i" },
            }),
        },
      },
    ]);

    let userIds: any = [];

    if (users.length) {
      for (let item of users) {
        userIds.push(item._id + "");
      }
    }

    // searching in collections
    let collections = await Collection.aggregate([
      {
        $match: {
          storeId: req.store?.storeId,
          userId: {$ne: req.currentUser?.id},
          ...(keyword &&
            keyword !== "" && {
              name: { $regex: `${keyword}`, $options: "i" },
            }),
        },
      },
      {
        $project: {
          name: 1,
          profileImage: 1,
          bannerImage: 1
        }
      }
    ]);

    // searching in NFTs
    NftCollection.aggregate([
      {
        $match: {
          storeId: req.store?.storeId,
          userId: {$nin: [req.currentUser?.id]},

          $or: [
            ...(keyword &&
              keyword !== "" && [
                { name: { $regex: `${keyword}`, $options: "i" } },
              ]),
            ...(userIds.length !== 0 ? [{ createdBy: { $in: userIds } }] : []),
          ],
        },
      },
      {
        $addFields: {
          // userId: { $toObjectId: "$userId" },
          collectionId: {
            $toObjectId: "$collectionId",
          },
        },
      },
      // {
      //   $lookup: {
      //     from: "users",
      //     localField: "userId",
      //     foreignField: "_id",
      //     as: "user",
      //   },
      // },
      // {
      //   $unwind: {
      //     path: "$user",
      //   },
      // },
      {
        $lookup: {
          from: "collections",
          localField: "collectionId",
          foreignField: "_id",
          as: "collectionData",
        },
      },
      {
        $unwind: {
          path: "$collectionData",
        },
      },
      {
        $match: {
          
            $or: [
              {
                "collectionData.userId": req.currentUser?.id,
              },
              {
                "collectionData.isHidden": false,
              },
            ],  
          
        }
      },
      {
        $addFields: {
          // nameOfSeller: "$user.name",
          // emailOfSeller: "$user.email",
          // usernameOfSeller: "$user.username",
          // bioOfSeller: "$user.bio",
          // profileOfSeller: "$user.profile",
          // coverOfSeller: "$user.cover",
          collectionName: "$collectionData.name",
          userId: "$userId",
          collectionId: {
            $toString: "$collectionId",
          },
          id: "$_id",
        },
      },
      {
        $project: {
          user: 0,
          _id: 0,
          collectionData: 0,
        },
      },
    ]).exec((err, nfts) => {
      if (err) {
        console.log('eeer',err)
        return res.status(400).json({
          status: false,
          message: "Error while fetching NFTs",
        });

        // throw new Error();
      } else {
        res.json({ status: true, data: { nfts, users, collections } });
      }
    });
  } catch (error) {
    throw new Error();
  }
});

export { router as searchNft };
