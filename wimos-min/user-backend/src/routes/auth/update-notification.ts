import express, { Request, Response } from "express";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/current-user/require-auth";
import { BadRequestError } from "../../middlewares/custom-err/bad-request-error";
import { NotAuthorizedError } from "../../middlewares/custom-err/not-authorized-error";
import { Notifications } from "../../models/notifications";
import { User } from "../../models/users";

const router = express.Router();

router.put(
  "/",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {

    // check user authorization
    let user = await User.findOne({ _id: req.currentUser?.id });
    if (!user) throw new BadRequestError("User not found");

    // destructuring body 
    let { id, type } = req.body

    if (!id || !type) throw new BadRequestError("Required params missing");
    if (type !== 'read' && type !== 'clear') throw new BadRequestError("Invalid value: field 'type'");

    // Check notification id
    let isValidNotification = await Notifications.findOne({ _id: id, userId: req.currentUser?.id });
    if (!isValidNotification) throw new BadRequestError("Invalid notification id");

    let message = ''

    if (type === 'read') {
        try {
            await Notifications.updateOne({ _id: id }, {
                $set: {
                    isRead: true
                }
            })
          
            message = 'Notifications marked as read'
            
        } catch (err) {
            console.log(err);
            throw new Error();
        }
    } else if (type === 'clear') {
        try {
            await Notifications.update({ _id: id }, {
                $set: {
                    isCleared: true
                }
            })     
            
            message = 'Notifications cleared successfully'
        } catch (err) {
            console.log(err);
            throw new Error();
        }
    }

    return res.status(200).json({
        status: true,
        message
    });
  }
);

export { router as updateNotification };
