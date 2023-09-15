import express, { Request, Response } from "express";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/current-user/require-auth";
import { BadRequestError } from "../../middlewares/custom-err/bad-request-error";
import { NftCollection } from "../../models/nfts";
import { NftLike } from "../../models/nft-likes";

const router = express.Router();

router.get(
  "/",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    if (!req.currentUser?.id) throw new BadRequestError("User not authorized");
    if (!req.store?.storeId) throw new BadRequestError("Store not found");

    NftCollection.aggregate([
      {
        $match: {
          storeId: req.store?.storeId,
          userId: req.currentUser.id,
        },
      },
      {
        $addFields: {
          // "userId": { "$toObjectId": "$userId" },
          collectionId: {
            $toObjectId: "$collectionId",
          },
        },
      },
      // {
      //     $lookup: {
      //         from: 'users',
      //         localField: 'userId',
      //         foreignField: '_id',
      //         as: 'user'
      //     }
      // },
      // {
      //     $unwind: {
      //         path: '$user',
      //     }
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
        },
      },
      {
        $addFields: {
          // nameOfSeller: "$user.name",
          // emailOfSeller: "$user.email",
          // usernameOfSeller: "$user.username",
          // profileOfSeller: "$user.profile",
          // coverOfSeller:"$user.cover",
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
    ]).exec(async (err, nfts) => {
      if (err) {
        return res.status(400).json({
          status: false,
          message: "Error while fetching NFTs",
        });
      } else {
        for (let i of nfts) {
          // removing unlockable content
          if (req.currentUser?.id) {
            if (
              req.currentUser?.id !== i.userId &&
              req.currentUser?.id !== i.createdBy
            ) {
              delete i.unlockableContent;
            }

            // check isLiked
            let isLiked = await NftLike.findOne({
              nftId: i?.id + "",
              userId: req.currentUser?.id,
            });
            if (isLiked) {
              i.isLiked = true;
            } else {
              i.isLiked = false;
            }
          } else {
            delete i.unlockableContent;
          }

          // checking whether auction nfts' enddate crossed, if crossed do the neccessary updates
          // in this fetched items and update those in db
          if (i.listed === true && i.type === "auction" && !i.isAuctionEnded) {
            let auctionEndedNfts = [];
            let currentDate = new Date();

            if (currentDate >= i.endDate) {
              i.isAuctionEnded = true;
              auctionEndedNfts.push(i.id);
            }

            if (auctionEndedNfts.length) {
              await NftCollection.updateMany(
                { _id: { $in: auctionEndedNfts } },
                {
                  $set: {
                    isAuctionEnded: true,
                  },
                }
              );
            }
          }

          // Checking for end date of fixed sale
          if (
            i.listed === true &&
            i.type === "fixed" &&
            !i.isFixedSaleEnded &&
            i.endDate
          ) {
            let fixedSaleEndedNfts = [];
            let currentDate = new Date();

            if (currentDate >= i.endDate) {
              i.isFixedSaleEnded = true;
              fixedSaleEndedNfts.push(i.id);
            }

            if (fixedSaleEndedNfts.length) {
              await NftCollection.updateMany(
                { _id: { $in: fixedSaleEndedNfts } },
                {
                  $set: {
                    isFixedSaleEnded: true,
                    price: null,
                    type: null,
                    startingPrice: null,
                    endDate: null,
                    endTime: null,
                    listed: false,
                    status: false
                  },
                }
              );
            }
          }
        }

        res.json({ status: true, data: nfts });
      }
    });
  }
);

export { router as getMyNftsRouter };
