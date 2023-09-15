import express, { Request, Response } from "express";
import { validateRequest } from "../../middlewares/controller-middleware-validator/request-validate";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/current-user/require-auth";
import { BadRequestError } from "../../middlewares/custom-err/bad-request-error";
import { NotAuthorizedError } from "../../middlewares/custom-err/not-authorized-error";
import { NftCollection } from "../../models/nfts";

const router = express.Router();

router.put(
  "/",
  currentUser,
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    // Check user is authorized
    if (!req.currentUser?.id) throw new NotAuthorizedError();

    // If store not found
    if (!req.store?.storeId) throw new BadRequestError("Store not found");

    let { id, bidId } =
      req.body;

      // If store not found
    if (!id) throw new BadRequestError("Id is missing");

    if (!bidId) throw new BadRequestError("bidId is missing");


    // Find the nft
    let findNft = await NftCollection.findOne({
      _id: id,
      storeId: req.store.storeId,
    });

    // If nft not found
    if (!findNft) throw new BadRequestError("Nft not found");

    // Check whether this user already made an offer
    let auctionBid = findNft.auctionOffers.find(x => x.userId == req.currentUser?.id && x._id+'' === bidId+'')
    if (!auctionBid) throw new BadRequestError("You didn't made an offer in this auction "); 

    try {

      // Adding new offer to the nft
      let updatedNft = await NftCollection.findOneAndUpdate(
        {
          _id: id,
          storeId: req.store.storeId,
        },
        {
          $pull: {
            auctionOffers: {
              userId: req.currentUser?.id
            }
          }
        },
        {
          new: true,
        }
      );

      // Send the response
      res.json({
        status: true,
        data: updatedNft,
        msg: 'Offer withdrawn successfully'
      });
    } catch (err) {
      console.log(err);
      throw new BadRequestError("Something went wrong");
    }
  }
);

export { router as withdrawAuctionBid };