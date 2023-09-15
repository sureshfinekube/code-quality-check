import express, { Request, Response } from "express";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/current-user/require-auth";
import { BadRequestError } from "../../middlewares/custom-err/bad-request-error";
import { User } from "../../models/users";
import { getListingFee } from "../../utils/axios";

const router = express.Router();

router.get(
  "/",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    let user = await User.findOne({ _id: req.currentUser?.id });

    if (!user) throw new BadRequestError("User not found");

      getListingFee({
        storeId: req.store?.storeId,
        metamaskId: user.metamaskId,
        userToken: req.headers?.authorization
      })
        .then((resp: any) => {
          if (resp?.status) {
            res.status(200).json({
              status: true,
              message: resp?.data?.message,
              data: resp?.data?.data
            });
          }
        })
        .catch((error) => {
          res.status(400).json({
            status: false,
            message: error?.message,
          });
        });

  }
);

export { router as getListingFee };
