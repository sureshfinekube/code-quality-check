import express, { Request, Response } from "express";
import { validateRequest } from "../../middlewares/controller-middleware-validator/request-validate";
import { currentUser } from "../../middlewares/current-user";
import { BadRequestError } from "../../middlewares/custom-err/bad-request-error";
import { NotAuthorizedError } from "../../middlewares/custom-err/not-authorized-error";
import { NftCollection } from "../../models/nfts";
import { User } from "../../models/users";
import { NftHistory } from "../../models/nft-history";
import { sendWebPushNotification } from "../../utils/web-push-notification/web-push-notification";
import { Notifications } from "../../models/notifications";
import { io } from '../../index'
import { NotificationSettings } from "../../models/notification-settings";

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
  validateRequest,
  async (req: Request, res: Response) => {
    let { id, copies, listingId } = req.body;

    if (!req.currentUser?.id) throw new NotAuthorizedError();
    if (!req.store?.storeId) throw new BadRequestError("Store not found");

    let nft: any = await NftCollection.findById(id);
    if (!nft) throw new BadRequestError("Nft not found");

    if ((req.store.contractStandard === 'erc721' || nft.tokenStandard === 'erc721') && nft.userId.includes(req.currentUser.id))
      throw new BadRequestError("You cannot buy your own nft");

    let updatedNft: any = {};
    
    let listing: any;

    let userDetails = await User.findOne({ _id: req.currentUser.id })

    // -- buying condition of erc721 tokens
    if (req.store?.contractStandard === "erc721" || nft.tokenStandard === 'erc721') {
      let ownersDetails = [{
        userId: req.currentUser.id,
        name: userDetails?.name,
        profile: userDetails?.profile,
        username: userDetails?.username,
        email: userDetails?.email,
        metamaskId: userDetails?.metamaskId,
        isListed: false,
      }]

      updatedNft = await NftCollection.findByIdAndUpdate(
        id,
        {
          $set: {
            userId: [req.currentUser.id],
            price: null,
            type: null,
            startingPrice: null,
            endDate: null,
            endTime: null,
            listed: false,
            status: false,
            ownersDetails,
            isFirstSale: false,
            updatedAt: new Date(),
          },
        },
        { new: true }
      ).exec();
    } 
    
    // -- buying condition of erc1155 tokens
    else if (req.store?.contractStandard === "erc1155" || nft.tokenStandard === 'erc1155') {

      if (!copies) throw new BadRequestError('Required params missing: field "copies"')

      listing = nft?.listings.find((i: any) => i._id == listingId)

      if (!listing) throw new BadRequestError('Invalid listing id')
      
      if (copies > listing.quantity) throw new BadRequestError('Invalid value: copies are greater than listing quantity')

      if (req.currentUser.id == listing.fromUserId) throw new BadRequestError("Invalid transaction error: you can't buy your own listing")

      let isOwner = nft.ownersDetails.find((k: any) => k.userId == req.currentUser?.id)

      let isMaxListingQuantityReached = false

      if (copies == listing.quantity) {
        isMaxListingQuantityReached = true
      }

      // finding lowest listed amount if this listing's copies finished and another listings are available
      let lowestListingPrice = 0
      if (isMaxListingQuantityReached && nft?.listings?.length > 1) {
        lowestListingPrice = Math.min.apply(Math, nft?.listings?.map(function(o: any) { return o.unitPrice; }))
      }

      // If endDate exists and all copies finished in this listing and some listings are pending
      let mainEndDate: any = ''
      let mainPriceOfMainEndDate: any = ''
      let newMainListingId: any = ''

      console.log('before end date condition',isMaxListingQuantityReached, nft?.listings?.length, nft.endDate, listingId, nft.mainListingId)

      if (isMaxListingQuantityReached && nft?.listings?.length > 1 && nft.endDate && listingId === nft.mainListingId) {
        console.log('is main listing buying')

        // -- Starts logic for find new mainListingId, endDate and price
        let remainingListings = nft?.listings?.filter((k:any) => k._id+'' !== listingId+'')

        console.log('remainingListings',remainingListings)

        let lowestListedPrice = Math.min.apply(Math, remainingListings?.map(function(o:any) { return o.unitPrice; }))

        console.log('lowestListedPrice',lowestListedPrice)

        let lowestListings: any = remainingListings.filter((x:any) => x.unitPrice === lowestListedPrice)

        console.log('lowestListedPrice',lowestListings)


        // If there is more than one listings with same lowest price, then compare it with quantity
        if (lowestListings?.length > 1) {
          console.log('more than one listings')
          let lowestQuantityFromLowestListings = Math.min.apply(Math, lowestListings?.map(function(o:any) { return o.quantity; }))

          let selectedLowestListing: any = lowestListings.find((i:any) => i.quantity === lowestQuantityFromLowestListings)

        console.log('lowestQuantityFromLowestListings',lowestQuantityFromLowestListings)
        console.log('selectedLowestListing',selectedLowestListing)


          mainEndDate = selectedLowestListing.endDate
          mainPriceOfMainEndDate = selectedLowestListing.unitPrice;
          newMainListingId = selectedLowestListing._id
        }

        // If there is only one listing with lowest price
        else {
          console.log('one listing')

          console.log('lowestListings[0].endDate',lowestListings[0].endDate)

          mainEndDate = lowestListings[0].endDate
          mainPriceOfMainEndDate = lowestListings[0].unitPrice;
          newMainListingId = lowestListings[0]._id
        }
        // -- Ends Logic for find new mainListingId, endDate and price

      }

      console.log('_mainEndDate',mainEndDate)


      updatedNft = await NftCollection.findByIdAndUpdate(
        id,
        {
          $set: {
            ...(nft?.listings.length === 1 && isMaxListingQuantityReached && {price: null}),
            ...(nft?.listings.length > 1 && isMaxListingQuantityReached && !nft.endDate && {price: lowestListingPrice}),

            ...(nft?.listings.length > 1 && isMaxListingQuantityReached && nft.endDate && mainPriceOfMainEndDate && {price: mainPriceOfMainEndDate}),
            ...(nft?.listings.length > 1 && isMaxListingQuantityReached && nft.endDate && mainEndDate && {endDate: mainEndDate}),
            ...(nft?.listings.length > 1 && isMaxListingQuantityReached && nft.endDate && newMainListingId && {mainListingId: newMainListingId}),


            ...(nft?.listings.length === 1 && isMaxListingQuantityReached  && {type: null}),
            startingPrice: null,
            ...(!mainEndDate && nft?.listings.length === 1 && isMaxListingQuantityReached && {endDate: null}),
            endTime: null,
            ...(nft?.listings.length === 1 && isMaxListingQuantityReached && {listed: false}),
            ...(nft?.listings.length === 1 && isMaxListingQuantityReached && {status: false}),
            updatedAt: new Date(),
            isFirstSale: false,
          },
          ...(isMaxListingQuantityReached && {$pull: {
            listings: { _id: listingId }
          }}),
          ...(!isOwner && {$push: { 
            userId: req.currentUser.id,
            ownersDetails: {
                userId: req.currentUser.id,
                // name: userDetails?.name,
                // profile: userDetails?.profile,
                // username: userDetails?.username,
                // email: userDetails?.email,
                metamaskId: userDetails?.metamaskId,
                isListed: false,
                numberOfCopies: copies,
            }
          }})
        },
        { new: true }
      ).exec();

      // finding ownerDetails 
      let ownerDetails = nft.ownersDetails.find((j: any) => listing?.fromUserId == j.userId)

      if (copies == ownerDetails.numberOfCopies) {
        // removing the listed user because all of his copies are saled
        await NftCollection.updateOne({ _id: id }, {
          $pull: {
            userId: ownerDetails.userId,
            ownersDetails : { userId: ownerDetails.userId },
            
          }
        })
      } else {
        // updating the owned copies of listed user after substraction
        let newOwnedCopies = ownerDetails.numberOfCopies - copies
        await NftCollection.updateOne({ _id: id, "ownersDetails.userId": ownerDetails.userId }, {
          $set: {
            "ownersDetails.$.numberOfCopies" : newOwnedCopies,
            "ownersDetails.$.isListed" : false,
          }
        })

        // adding new copies(incrementing), if the buyer is already one of the owners
        if (isOwner) {
          await NftCollection.updateOne({ _id: id, "ownersDetails.userId": req.currentUser?.id }, {
            $inc: {
              "ownersDetails.$.numberOfCopies" : copies,
            }
          })
        }
      }

      // Updating listing quantity if not purchasing all listed copies
      if (!isMaxListingQuantityReached) {
        let newListingQuantity = listing.quantity - copies
        await NftCollection.updateOne({ _id: id, "listings._id": listingId }, {
          $set: {
            "listings.$.quantity" : newListingQuantity,
          }
        })
      }

    }

    // Previous owner data
    let previousOwnerData = await User.findOne({ _id: nft.userId });
    let purchasingUserData = await User.findOne({ _id: req.currentUser.id });

    let indianTime = getIstTime();

    let amount = nft?.price ? nft?.price : nft?.startingPrice;

    // adding event to history
    await NftHistory.updateOne(
      {
        nftId: id,
      },
      {
        $push: {
          events: {
            eventName: "buy",
            userId: req.currentUser.id,
            fromMetamaskId: req.store.contractStandard === 'erc721' || nft.tokenStandard === 'erc721' ? previousOwnerData?.metamaskId : req.store.contractStandard === 'erc1155' || nft.tokenStandard === 'erc1155' ? listing.fromMetamaskId : '',
            toMetamaskId: purchasingUserData?.metamaskId,
            previousOwnerId: req.store.contractStandard === 'erc721' || nft.tokenStandard === 'erc721' ? nft.userId[0] : req.store.contractStandard === 'erc1155' || nft.tokenStandard === 'erc1155' ? listing.fromUserId : '',
            amount,
            ...((req.store?.contractStandard === "erc1155" || nft.tokenStandard === 'erc1155') && {numberOfCopies: copies}),
            date: indianTime,
          },
        },
      }
    );

    let webPushNotification = {
      title: 'Congrats!, your NFT is purchased by ...',
      description: `Your NFT ${nft?.name} is purchased by ${userDetails?.name}. Check it out...`
    }

    let previousOwnerId = req.store?.contractStandard === 'erc721' || nft.tokenStandard === 'erc721' ? nft.userId[0] : req.store.contractStandard === 'erc1155' || nft.tokenStandard === 'erc1155' ? listing.fromUserId : ''

    // Web Push Notification (if user enabled this option in notification settings)
    let userNotificationSettings = await NotificationSettings.findOne({userId: previousOwnerId})

    if (userNotificationSettings?.nftPurchase === true) {
      sendWebPushNotification(previousOwnerId, webPushNotification).then((resp) => {
        console.log('Successfully sent Web push notification')
      }).catch((err) => {
        console.log('Failed web push notification', err)
      })
    }

    let savedNotification: any = {}

    // Adding normal notification to user
    if (userNotificationSettings?.nftPurchase === true) {
      const buildNotification = Notifications.build({
        userId: previousOwnerId,
        title: 'Your NFT has been purchased',
        description: `Your NFT ${nft?.name} is purchased by ${userDetails?.name}. Check it out...`,
        type: 'buy',
        redirectType: 'nft',
        redirectId: nft?.id,
        image: nft?.uri,
        userImage: null
      });
      
      savedNotification = await buildNotification.save();
    }

    // io.on('connection', (socket) => {

    // })

    updatedNft.previousOwnerId = previousOwnerId

    res.json({
      status: true,
      data: updatedNft,
      previousOwnerId: previousOwnerId,
      notificationData: savedNotification
    });
  }
);

export { router as buyNFTRouter };
