import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/current-user/require-auth";
import express, { Request, Response } from "express";
import { NftCollection } from "../../models/nfts";
import { BadRequestError } from "../../middlewares/custom-err/bad-request-error";
import { validateIdMiddleware } from "../../middlewares/controller-middlewares/id-validation";
import { validateRequest } from "../../middlewares/controller-middleware-validator/request-validate";

const router = express.Router();

router.put(
  "/",
  currentUser,
  requireAuth,
  validateIdMiddleware,
  validateRequest,
  async (req: Request, res: Response) => {
    const { id, listingId } = req.body;

    const nft = await NftCollection.findById(id);

    if (!nft) {
      throw new BadRequestError("NFT not found");
    }

    if (nft.tokenStandard === "erc1155" && !listingId) {
      throw new BadRequestError("Required params missing: field 'listingId'");
    }

    if (nft.tokenStandard === "erc1155") {
      // find listing
      let listing = nft.listings.find(
        (x: any) => x._id + "" === listingId + ""
      );

      if (!listing || listing?.fromUserId !== req.currentUser!.id) {
        throw new BadRequestError("You are not authorized to cancel this NFT");
      }
    }

    let isReadyToFalseListed = false
    if (nft.tokenStandard === 'erc1155' && nft?.listings.length == 1) {
      isReadyToFalseListed = true
    }

    try {

      // checking whether mainListingId listing is cancelling (endDate exists case)
      let mainEndDate: any = ''
      let mainPriceOfMainEndDate: any = ''
      let newMainListingId: any = ''

      if (nft.endDate && listingId === nft.mainListingId) {

        // -- Starts logic for find new mainListingId, endDate and price
        let remainingListings = nft?.listings?.filter((k:any) => k._id+'' !== listingId+'')

        let lowestListedPrice = Math.min.apply(Math, remainingListings?.map(function(o:any) { return o.unitPrice; }))

        let lowestListings: any = remainingListings.filter((x:any) => x.unitPrice === lowestListedPrice)

        // If there is more than one listings with same lowest price, then compare it with quantity
        if (lowestListings?.length > 1) {
          let lowestQuantityFromLowestListings = Math.min.apply(Math, lowestListings?.map(function(o:any) { return o.quantity; }))

          let selectedLowestListing: any = lowestListings.find((i:any) => i.quantity === lowestQuantityFromLowestListings)

          mainEndDate = selectedLowestListing.endDate
          mainPriceOfMainEndDate = selectedLowestListing.unitPrice;
          newMainListingId = selectedLowestListing._id
        }

        // If there is only one listing with lowest price
        else if (lowestListings?.length == 1) {
          mainEndDate = lowestListings[0].endDate
          mainPriceOfMainEndDate = lowestListings[0].unitPrice;
          newMainListingId = lowestListings[0]._id
        }
        // -- Ends Logic for find new mainListingId, endDate and price


      }

      console.log('==mainEndDate',mainEndDate)
      console.log('==mainPriceOfMainEndDate',mainPriceOfMainEndDate)
      console.log('==newMainListingId',newMainListingId)
      console.log('==nft.endDate',nft.endDate)



      let updatedNft = await NftCollection.findOneAndUpdate(
        {
          _id: id,
          ...((req.store?.contractStandard === "erc1155" ||
            nft.tokenStandard === "erc1155") && {
            "ownersDetails.userId": req.currentUser?.id,
          }),
        },
        {
          ...((req.store?.contractStandard === 'erc721' || nft?.tokenStandard === 'erc721' || isReadyToFalseListed) && {
            status: false,
            listed: false,
            type: null,
            endDate: null,
            mainListingId: null,
            price: null
          }),          
          ...(nft.tokenStandard === "erc1155" && nft.endDate && mainEndDate && { endDate: mainEndDate }),
          ...(nft.tokenStandard === "erc1155" && nft.endDate && mainPriceOfMainEndDate && { price: mainPriceOfMainEndDate }),
          ...(nft.tokenStandard === "erc1155" && nft.endDate && newMainListingId && { mainListingId: newMainListingId }),
          endTime: null,
          startingPrice: 0,
          updatedAt: new Date(),
          ...((req.store?.contractStandard === "erc1155" ||
            nft.tokenStandard === "erc1155") && {
            $pull: {
              listings: { _id: listingId },
            },
          }),
          ...((req.store?.contractStandard === "erc1155" ||
            nft?.tokenStandard === "erc1155") && {
            "ownersDetails.$.isListed": false,
          }),
        },
        { new: true }
      );

      res.json({
        status: true,
        data: updatedNft,
      });
    } catch (error) {
      console.log("erru-->", error);
      throw new Error();
    }
  }
);

export { router as cancelNftListingRouter };
