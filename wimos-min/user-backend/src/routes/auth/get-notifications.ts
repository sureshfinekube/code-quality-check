import express, { Request, Response } from "express";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/current-user/require-auth";
import { BadRequestError } from "../../middlewares/custom-err/bad-request-error";
import { NotAuthorizedError } from "../../middlewares/custom-err/not-authorized-error";
import { Notifications } from "../../models/notifications";
import { User } from "../../models/users";

const router = express.Router();

router.get(
  "/",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    let user = await User.findOne({ _id: req.currentUser?.id });

    if (!user) throw new BadRequestError("User not found");

    try {
        let notifications = await Notifications.aggregate([
          {
            $match: {
              userId: req.currentUser?.id,
              isCleared: false
            },
          },
          {
            $addFields: {
                "redirectId": {
                    "$toObjectId": "$redirectId"
                }
            }
          },
          {
            $lookup: {
                from: 'nfts',
                localField: 'redirectId',
                foreignField: '_id',
                as: 'NFT'
            }
          },
          {
            $unwind: {
                path: "$NFT",
                preserveNullAndEmptyArrays: true
            }
          },
          {
            $addFields: {
              "image": "$NFT.uri"
            }
          },
          {
            $project: {
              NFT: 0
            }
          }
        ]).sort({_id: -1})

        // console.log('noties_______>',notifications)
      
        res.status(200).json({
            status: true,
            message: 'Notifications fetched successfully',
            data: {
                notifications
            }
        });

    } catch (err) {
      console.log(err);
      throw new Error();
    }
  }
);

export { router as getNotifications };
