import express, { Request, Response } from "express";
import { validateRequest } from "../../middlewares/controller-middleware-validator/request-validate";
import { idParamValidation } from "../../middlewares/controller-middlewares/id-param-validation";
import { BadRequestError } from "../../middlewares/custom-err/bad-request-error";
import { currentUser } from "../../middlewares/current-user";
import { User } from "../../models/users";
import { UserFollow } from "../../models/user-follow";

const router = express.Router();

router.get(
  "/:id",
  idParamValidation,
  validateRequest,
  currentUser,
  async (req: Request, res: Response) => {
    let { id } = req.params;

    // Find user
    let findUser = await User.findById(id, {
      email: 0,
      createdAt: 0,
      updatedAt: 0,
      status: 0,
      wishlist: 0
    })
    .lean();

    // If user not found
    if (!findUser) throw new BadRequestError("User not found");

    let userData: any = findUser;

    if (req.currentUser?.id) {
      let isFollowing = await UserFollow.findOne({
        followerUserId: req.currentUser?.id,
        followingUserId: id,
      });

      if (isFollowing) {
        userData.isFollowing = true;
      } else {
        userData.isFollowing = false;
      }
    }

    res.json({
      status: true,
      data: {
        user: userData,
      },
    });
  }
);

export { router as findUserRouter };
