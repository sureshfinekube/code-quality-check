import express, { Request, Response } from "express";
import { BadRequestError } from "../../middlewares/custom-err/bad-request-error";
import { User } from "../../models/users";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/current-user/require-auth";
import { NftCollection } from "../../models/nfts";

const router = express.Router();

router.post("/", currentUser, requireAuth, async (req: Request, res: Response) => {
  if (!req.store?.storeId) throw new BadRequestError("Store not found");

  // Check userid
  let isValidUserId = await User.findOne({_id: req.currentUser?.id})
  if (!isValidUserId) throw new BadRequestError("Invalid user")

  // Validate nftId
  let { nftId } = req.body;
  if (!nftId) throw new BadRequestError("Required params missing");
  
  let isValidNft = await NftCollection.findById(nftId)
  if (!isValidNft) throw new BadRequestError('Invalid nftId')

  // Check whether this nft already added or not
  let isAlreadyAdded = isValidUserId?.wishlist.find((e) => e.nftId === nftId)

  if (isAlreadyAdded) throw new BadRequestError("Already added!")

  try {
      // saving new wishlist
      await User.updateOne({
          _id: req.currentUser?.id,
      }, {
        $push: {
            wishlist: {
                nftId,
                addedAt: new Date()
            }
        }
      });

      res.status(200).json({ status: true, data: 'Added to wishlist' });

  } catch (error) {
    throw new Error();
  }
});

export { router as addToWishlistRouter };
