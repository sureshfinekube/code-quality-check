import express, { Request, Response } from "express";
import { BadRequestError } from "../../middlewares/custom-err/bad-request-error";
import { User } from "../../models/users";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/current-user/require-auth";
import { NftCollection } from "../../models/nfts";
import { idParamValidation } from "../../middlewares/controller-middlewares/id-param-validation";
import { validateRequest } from "../../middlewares/controller-middleware-validator/request-validate";

const router = express.Router();

router.delete(
  "/",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    if (!req.store?.storeId) throw new BadRequestError("Store not found");

    // Check userid
    let isValidUserId = await User.findOne({ _id: req.currentUser?.id });
    if (!isValidUserId) throw new BadRequestError("Invalid user");

    try {
      // removing from wishlist
      await User.updateOne(
        {
          _id: req.currentUser?.id,
          storeId: req.store?.storeId,
        },
        {
          $set: {
            wishlist: [],
          },
        }
      );

      res
        .status(200)
        .json({ status: true, message: "Wishlist cleared successfully" });
    } catch (error) {
      throw new Error();
    }
  }
);

export { router as clearWishlistRouter };
