import express, { Request, Response } from "express";
import { validateRequest } from "../../middlewares/controller-middleware-validator/request-validate";
import { likeNftValidator } from "../../middlewares/controller-middlewares/like-nft-middleware";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/current-user/require-auth";
import { BadRequestError } from "../../middlewares/custom-err/bad-request-error";
import { NotAuthorizedError } from "../../middlewares/custom-err/not-authorized-error";
import { NftCollection } from "../../models/nfts";
import { NftLike } from "../../models/nft-likes";
import { User } from "../../models/users";
import { NotificationSettings } from "../../models/notification-settings";
import { Notifications } from "../../models/notifications";

const router = express.Router();

router.post(
  "/",
  currentUser,
  requireAuth,
  likeNftValidator,
  validateRequest,
  async (req: Request, res: Response) => {
    // Check user is authorized
    if (!req.currentUser?.id) throw new NotAuthorizedError();
    let isValidUser = await User.findOne({ _id: req.currentUser?.id })
    if (!isValidUser) throw new NotAuthorizedError()

    // If store not found
    if (!req.store?.storeId) throw new BadRequestError("Store not found");

    let { nftId } = req.body;

    // Find the nft
    let findNft = await NftCollection.findOne({
      _id: nftId,
      storeId: req.store.storeId,
    });

    // If nft not found
    if (!findNft) throw new BadRequestError("Nft not found");

    // If this user liked already
    let isAlreadyLiked = await NftLike.findOne({ nftId, userId: req.currentUser?.id })
    if (isAlreadyLiked)
      throw new BadRequestError("You already liked this NFT");

    try {
      // Saving new like document
      let newLike = NftLike.build({
        nftId,
        userId: req.currentUser?.id
      })

      await newLike.save()

      // incrementing like count in nft collection
      let updatedNft = await NftCollection.updateOne({_id: nftId}, {
        $inc: {
            likes_count: 1
        }
      })

      let userNotificationSettings = await NotificationSettings.findOne({userId: findNft?.userId[0]})
      let savedNotification: any = {}

      // Adding normal notification to user
      if (userNotificationSettings?.likeAndFollow === true) {
        const buildNotification = Notifications.build({
          userId: findNft?.userId[0],
          title: `${isValidUser?.name} liked your NFT`,
          description: `${isValidUser?.name} liked your NFT`,
          type: 'like',
          redirectType: 'nft',
          redirectId: findNft?.id,
          image: findNft?.uri,
          userImage: null
        });
        
        savedNotification = await buildNotification.save();
      }

      // Send the response
      res.json({
        status: true,
        data: updatedNft,
        msg: 'NFT liked successfully',
        notificationData: savedNotification
      });
    } catch (err) {
      console.log(err);
      throw new BadRequestError("Something went wrong");
    }
  }
);

export { router as likeNft };
