import express, { Request, Response } from "express";
import { validateRequest } from "../../middlewares/controller-middleware-validator/request-validate";
import { followValidation } from "../../middlewares/controller-middlewares/follow-middleware";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/current-user/require-auth";
import { BadRequestError } from "../../middlewares/custom-err/bad-request-error";
import { NotAuthorizedError } from "../../middlewares/custom-err/not-authorized-error";
import { User } from "../../models/users";
import { UserFollow } from "../../models/user-follow";
import { NotificationSettings } from "../../models/notification-settings";
import { Notifications } from "../../models/notifications";

const router = express.Router();

router.put(
  "/",
  currentUser,
  requireAuth,
  followValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    // Check store id
    console.log('in routerrr')
    if (!req.store?.storeId) throw new BadRequestError("Store not found");
    
    // Check user authorization
    if (!req.currentUser?.id) throw new NotAuthorizedError();
    let user = await User.findOne({ _id: req.currentUser?.id });
    if (!user) throw new NotAuthorizedError();

    let { userId } = req.body;

    // Check whether this user already reported
    let isAlreadyFollowed = await UserFollow.findOne({
      followerUserId: req.currentUser?.id,
      followingUserId: userId,
    });
    if (isAlreadyFollowed)
      throw new BadRequestError("You already following this user");

    try {
      // Saving following data to db
      let followBuild = UserFollow.build({
        followerUserId: req.currentUser?.id,
        followingUserId: userId,
      })

      await followBuild.save();

      // Updating count in user collection
      await User.updateOne({ _id: req.currentUser?.id }, {
        $inc: {
            following_count: 1
        } 
      })

      await User.updateOne({ _id: userId }, {
        $inc: {
            follower_count: 1
        } 
      })


      // Saving notification
      let userNotificationSettings = await NotificationSettings.findOne({userId})
      let savedNotification: any = {}

      // Adding normal notification to user
      if (userNotificationSettings?.likeAndFollow === true) {
        const buildNotification = Notifications.build({
          userId,
          title: `${user?.name} started following you.`,
          description: `${user?.name} started following you.`,
          type: 'follow',
          redirectType: 'user',
          redirectId: user?.id,
          userImage: user?.profile,
          image: null
        });
        
        savedNotification = await buildNotification.save();
      }


      res.json({
        status: true,
        message: "Followed successfully",
        data: {
          notificationData: savedNotification
        }
        // message: 'API is on maintenance...'
      });
    } catch (error) {
      console.log('eee',error)
      throw new Error();
    }
  }
);

export { router as followUserRouter };
