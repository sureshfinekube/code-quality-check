const webPush = require("web-push");
import { Subscription } from "../../models/subscriptions";

interface dataModel {
  title: string;
  description: string;
}

const sendWebPushNotification = (userId: string, data: dataModel) => {
  return new Promise (async (resolve, reject) => {
    try {
  
      let notificationSubscriptionDetails = await Subscription.findOne({userId}).sort({_id: -1})

      if (!notificationSubscriptionDetails) {
        reject('Subscription details not found!')
      }
  
      const options = {
        vapidDetails: {
          subject: "mailto:myemail@example.com",
          publicKey: process.env.VAPID_PUBLIC_KEY,
          privateKey: process.env.VAPID_PRIVATE_KEY,
        },
      };
  
      await webPush.sendNotification(
        notificationSubscriptionDetails,
        JSON.stringify({
          title: data?.title,
          description: data?.description,
          image:
            "https://cdn2.vectorstock.com/i/thumb-large/94/66/emoji-smile-icon-symbol-smiley-face-vector-26119466.jpg",
        }),
        options
      );

      resolve({success: true})
    } catch (error) {
      reject(error)
    }
  })
};

export {sendWebPushNotification}