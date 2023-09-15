import express, { Request, Response } from "express";
import { validateRequest } from "../../middlewares/controller-middleware-validator/request-validate";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/current-user/require-auth";
import { BadRequestError } from "../../middlewares/custom-err/bad-request-error";
import { Bid } from "../../models/bids";
import { NftCollection } from "../../models/nfts";
import { NotAuthorizedError } from "../../middlewares/custom-err/not-authorized-error";
import { User } from "../../models/users";
import { NftHistory } from "../../models/nft-history";
import { approveOfferValidator } from "../../middlewares/controller-middlewares/approve-offer-middleware";

const router = express.Router();

function getIstTime() {
  let currentTime = new Date();

  let currentOffset = currentTime.getTimezoneOffset();

  let ISTOffset = 330; // IST offset UTC +5:30

  let ISTTime = new Date(
    currentTime.getTime() + (ISTOffset + currentOffset) * 60000
  );

  return ISTTime;
}

router.put(
  "/",
  currentUser,
  requireAuth,
  approveOfferValidator,
  validateRequest,
  async (req: Request, res: Response) => {
    if (!req.currentUser?.id) throw new NotAuthorizedError();

    let { nftId, offerId } = req.body;
    let nft = await NftCollection.findById(nftId);

    if (!nft) throw new BadRequestError("Nft not found");
    // if (nft.userId.includes(req.currentUser?.id))
    //   throw new BadRequestError("Permission denied");

    // let bid = await Bid.findById(bidId);
    // if (!bid) throw new BadRequestError('Bid not found');

    let offer = await nft?.offers.find((x: any) => x._id + "" === offerId + "");
    if (!offer) throw new BadRequestError("Offer not found");

    // Check user authorization
    if (req.currentUser?.id !== offer.userId) throw new BadRequestError('Invalid action')

    // changing NFT owner
    let updatedNft = await NftCollection.updateOne(
      {
        _id: nftId,
      },
      {
        $pull: {
          offers: {
            _id: offerId
          }
        } 
      },
      {
        new: true,
      }
    ).exec();

    return res.json({
      status: true,
      data: updatedNft,
    });

  }
);

export { router as cancelOfferRouter };
