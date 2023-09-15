import express, { Request, Response } from "express";
import { validateRequest } from "../../middlewares/controller-middleware-validator/request-validate";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/current-user/require-auth";
import { BadRequestError } from "../../middlewares/custom-err/bad-request-error";
import { NotAuthorizedError } from "../../middlewares/custom-err/not-authorized-error";
import { SearchHistory } from "../../models/search-history";
import { User } from "../../models/users";

const router = express.Router();

router.get(
  "/",
  currentUser,
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    if (!req.currentUser?.id) throw new NotAuthorizedError();

    let user = await User.findById(req.currentUser?.id);
    if (!user) throw new BadRequestError("Unauthorized!!");

    try {
      let searchHistory = await SearchHistory.aggregate([
        {
          $match: {
            userId: req.currentUser?.id,
            storeId: req.store?.storeId,
          },
        },
        {
            $addFields: {
                "nftId": {
                    "$toObjectId": "$nftId"
                }
            }
        },
        {
            $lookup: {
                from: 'nfts',
                localField: 'nftId',
                foreignField: '_id',
                as: 'nftData'
            }
        },
        {
            $unwind: {
                path: "$nftData"
            }
        },
        {
            $addFields: {
                "nft.name": "$nftData.name",
                "nft.uri": "$nftData.uri",
                "nft.id": {
                    "$toString": "$nftId"
                },
            }
        },
        {
            $project: {
                nftData: 0
            }
        }
      ]).sort({ _id: -1 });

      // console.log('user--histoory',searchHistory)

      res.json({
        status: true,
        message: "Search history fetched successfully",
        data: {
          searchHistory,
        },
      });
    } catch (error) {
      throw new Error();
    }
  }
);

export { router as getSearchHistory };
