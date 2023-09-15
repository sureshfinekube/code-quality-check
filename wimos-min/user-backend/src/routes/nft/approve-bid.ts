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
import { bidNftSellActionValidator } from "../../middlewares/controller-middlewares/bid-sell-action-validator";

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

router.post(
  "/",
  currentUser,
  requireAuth,
  bidNftSellActionValidator,
  validateRequest,
  async (req: Request, res: Response) => {
    if (!req.currentUser?.id) throw new NotAuthorizedError();

    let { nftId, bidId } = req.body;
    let nft = await NftCollection.findById(nftId);

    if (!nft) throw new BadRequestError("Nft not found");
    // if (nft.userId.includes(req.currentUser?.id))
    //   throw new BadRequestError("Permission denied");
    // if (nft.type !== 'auction') throw new BadRequestError('This nft is not auction type');
    if (req.store?.contractStandard !== "erc721")
      throw new BadRequestError("Invalid action for this store");

    // let bid = await Bid.findById(bidId);
    // if (!bid) throw new BadRequestError('Bid not found');

    let bid = await nft?.bidOffers.find((x: any) => x._id + "" === bidId + "");
    if (!bid) throw new BadRequestError("Bid not found");

    if (bid.userId === req.currentUser?.id)
      throw new BadRequestError("You cannot sell to your own bid");
    // if (bid.nftId !== nft.id) throw new BadRequestError('Bid is invalid');

    try {
      // Update nft owner to new and reset the nft Data
      let updatedNft = await NftCollection.updateOne(
        {
          _id: nftId,
        },
        {
          $set: {
            userId: [bid.userId],
            price: 0,
            listed: false,
            status: false,
            type: null,
            startingPrice: 0,
            bidOffers: [],
            updatedAt: new Date(),
          },
          // $pull: {
          //     bidOffers: {
          //       _id: bidId
          //     }
          // }
        },
        {
          new: true,
        }
      ).exec();

      // Remove bid of this nft
      // await Bid.deleteOne({ _id: bidId }).exec();

      let previousOwnerData = await User.findOne({ _id: nft?.userId });
      let purchasingUserData = await User.findOne({ _id: bid?.userId });

      let indianTime = getIstTime();

      // adding event to history
      await NftHistory.updateOne(
        {
          nftId,
        },
        {
          $push: {
            events: {
              eventName: "buy",
              userId: bid.userId,
              fromMetamaskId: previousOwnerData?.metamaskId,
              toMetamaskId: purchasingUserData?.metamaskId,
              previousOwnerId: nft?.userId[0],
              amount: bid.price,
              date: indianTime,
            },
          },
        }
      );

      return res.json({
        status: true,
        data: updatedNft,
      });
    } catch (error) {
        throw new Error()
    }
  }
);

export { router as approveBidRouter };
