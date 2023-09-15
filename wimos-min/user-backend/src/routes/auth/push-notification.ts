// import webpush from "web-push";
const webPush = require('web-push')
import express, { Request, Response } from "express";
import { validateRequest } from "../../middlewares/controller-middleware-validator/request-validate";
import { loginRouteValidation } from "../../middlewares/controller-middlewares/login-middleware";
import { BadRequestError } from "../../middlewares/custom-err/bad-request-error";
import { Subscription } from "../../models/subscriptions";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {

//   const publicVapidKey = "BOGUywfYF7I07XRtPBmym15rIsgqh7L-pQjmcFkWMD9JVSeSTK1gOuNHzxuIowy5LuX2xBElGCEXXFSa5S_1K8s";
//   const privateVapidKey = "4mkdq3O30b_WOglFgmWod_Re0Jt9G5gXf2V2ybinZtE";
//   webpush.setVapidDetails(
//     "mailto:test@test.com",
//     publicVapidKey,
//     privateVapidKey
//   );
//   const { subscription, title, message } = req.body;
//   const payload = JSON.stringify({ title, message });
//   webpush
//     .sendNotification(subscription, payload)
//     .catch((err: any) => console.error("err", err));
//   res.status(200).json({ success: true });

    try {
        let newSubscription = {
            endpoint: req.body?.endpoint,
            expirationTime: null,
            keys: {
                p256dh: req.body?.keys?.p256dh,
                auth: req.body?.keys?.auth
            }
        }

        // console.log('rrrr',req.body)

        const options = {
            vapidDetails: {
              subject: "mailto:myemail@example.com",
              publicKey: process.env.VAPID_PUBLIC_KEY,
              privateKey: process.env.VAPID_PRIVATE_KEY,
            },
        };

        const res2 = await webPush.sendNotification(
        newSubscription,
        JSON.stringify({
          title: "Hello from umer",
          description: "this message is coming from the umer's server",
          image:
            "https://cdn2.vectorstock.com/i/thumb-large/94/66/emoji-smile-icon-symbol-smiley-face-vector-26119466.jpg",
        }),
        options
      );
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }

});

export { router as sendNotification };
