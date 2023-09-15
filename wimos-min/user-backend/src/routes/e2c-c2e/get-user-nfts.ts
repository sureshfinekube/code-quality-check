import express, { Request, Response } from "express";
import { validateRequest } from "../../middlewares/controller-middleware-validator/request-validate";
import { userIdValidator } from "../../middlewares/controller-middlewares/userId-middleware";
import { BadRequestError } from "../../middlewares/custom-err/bad-request-error";
import { NftCollection } from "../../models/nfts";
import { NftLike } from "../../models/nft-likes";
import { currentUser } from "../../middlewares/current-user";

const router = express.Router();

router.get(
  "/:userId",
  userIdValidator,
  validateRequest,
  currentUser,
  async (req: Request, res: Response) => {
    let userId = req.params.userId;

    NftCollection.aggregate([
      {
        $match: {
          storeId: req.store?.storeId,
          userId: userId,
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
        $addFields: {
          // nameOfSeller: "$user.name",
          // emailOfSeller: "$user.email",
          // usernameOfSeller: "$user.username",
          // profileOfSeller: "$user.profile",
          collectionName: "$collectionData.name",
          userId: "$userId",
          collectionId: {
            $toString: "$collectionId",
          },
          id: {
            $toString: "$_id",
          },
        },
      },
      {
        $lookup: {
          from: "nftlikes",
          localField: "id",
          foreignField: "nftId",
          as: "likes",
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
        throw new Error();
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

export { router as getUserNftsRouter };
