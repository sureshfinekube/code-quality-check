import express, { Request, Response } from "express";
import { validateRequest } from "../../middlewares/controller-middleware-validator/request-validate";
import { loginRouteValidation } from "../../middlewares/controller-middlewares/login-middleware";
import { BadRequestError } from "../../middlewares/custom-err/bad-request-error";
import { Subscription } from "../../models/subscriptions";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/current-user/require-auth";
import { User } from "../../models/users";

const webPush = require("web-push");

const router = express.Router();

router.post(
  "/",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    if (!req?.store?.storeId) throw new BadRequestError("Store not found");

    let user = await User.findOne({ _id: req.currentUser?.id });

    if (!user) throw new BadRequestError("Unauthorized user!");

    console.log("bbbbbbbbodyyyyy", req.body);

    try {
      const newSubscription = await Subscription.create({
        ...req.body,
        userId: req.currentUser?.id,
      });

    //   const options = {
    //     vapidDetails: {
    //       subject: "mailto:myemail@example.com",
    //       publicKey: process.env.VAPID_PUBLIC_KEY,
    //       privateKey: process.env.VAPID_PRIVATE_KEY,
    //     },
    //   };

    //   const res2 = await webPush.sendNotification(
    //     newSubscription,
    //     JSON.stringify({
    //       title: "Hello from umer",
    //       description: "this message is coming from the umer's server",
    //       image:
    //         "https://cdn2.vectorstock.com/i/thumb-large/94/66/emoji-smile-icon-symbol-smiley-face-vector-26119466.jpg",
    //     }),
    //     options
    //   );
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

export { router as subscribeNotification };
