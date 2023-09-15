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
import { endAuctionValidator } from "../../middlewares/controller-middlewares/end-auction-middleware";

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
  endAuctionValidator,
  validateRequest,
  async (req: Request, res: Response) => {
    if (!req.currentUser?.id) throw new NotAuthorizedError();

    let { nftId } = req.body;
    let nft = await NftCollection.findById(nftId);

    if (!nft) throw new BadRequestError("Nft not found");

    try {
      if (
        !nft.userId.includes(req.currentUser?.id) &&
        !nft.auctionOffers.find((x: any) => x.userId === req.currentUser?.id)
      )
        throw new BadRequestError("Permission denied");

      if (nft.type !== "auction")
        throw new BadRequestError("This nft is not auction type");
      if (
        req.store?.contractStandard !== "erc721" &&
        nft.tokenStandard !== "erc721"
      )
        throw new BadRequestError("Invalid action for this store");

      let highestBid: any = null

      if (nft?.auctionOffers.length) {
        highestBid = nft?.auctionOffers.reduce((max: any, obj: any) =>
          max.price > obj.price ? max : obj
        );
      }

      console.log("--highestBid", highestBid);
      let isNoBid = false;
      if (!highestBid) {
        // There are no bids on this auction
        isNoBid = true;
      }

      let updatedNft = {};

      if (isNoBid === true) {
        console.log("--in no bid");

        // Update nft owner to new and reset the nft Data
        updatedNft = await NftCollection.updateOne(
          {
            _id: nftId,
          },
          {
            $set: {
              price: 0,
              listed: false,
              status: false,
              type: null,
              startingPrice: 0,
              updatedAt: new Date(),
              isAuctionCompletelyEnded: true,
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
      } else {
        // back to old stage with the same owner
        // Update nft owner to new and reset the nft Data

        // in yes bid
        console.log("--in yes bid");

        updatedNft = await NftCollection.updateOne(
          {
            _id: nftId,
          },
          {
            $set: {
              userId: [highestBid.userId],
              price: 0,
              listed: false,
              status: false,
              type: null,
              startingPrice: 0,
              updatedAt: new Date(),
              isAuctionCompletelyEnded: true,
            },
            $pull: {
              auctionOffers: {
                _id: highestBid._id,
              },
            },
          },
          {
            new: true,
          }
        ).exec();

        // adding event to history
        let previousOwnerData = await User.findOne({ _id: nft?.userId });
        let purchasingUserData = await User.findOne({
          _id: highestBid?.userId,
        });

        let indianTime = getIstTime();

        await NftHistory.updateOne(
          {
            nftId,
          },
          {
            $push: {
              events: {
                eventName: "buy",
                userId: highestBid.userId,
                fromMetamaskId: previousOwnerData?.metamaskId,
                toMetamaskId: purchasingUserData?.metamaskId,
                previousOwnerId: nft?.userId[0],
                amount: highestBid.price,
                date: indianTime,
              },
            },
          }
        );
      }

      return res.json({
        status: true,
        data: updatedNft,
      });
    } catch (error) {
      console.log("errrrrrr>", error);
      throw new Error();
    }
  }
);

export { router as endAuctionRouter };
