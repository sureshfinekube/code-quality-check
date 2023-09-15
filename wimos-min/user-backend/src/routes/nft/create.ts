import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { validateRequest } from "../../middlewares/controller-middleware-validator/request-validate";
import { createNFTValidation } from "../../middlewares/controller-middlewares/create-nft-middleware";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/current-user/require-auth";
import { BadRequestError } from "../../middlewares/custom-err/bad-request-error";
import { NotAuthorizedError } from "../../middlewares/custom-err/not-authorized-error";
import { Collection } from "../../models/collections";
import { NftCollection } from "../../models/nfts";
import { NftHistory } from "../../models/nft-history";
import { User } from "../../models/users";
import { TokenIdSalesIdAuctionId } from "../../models/TokenIdSalesIdAuctionId";

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
  createNFTValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    console.log('in router')
    let {
      address,
      uri,
      name,
      description,
      collectionId,
      tokenId,
      mintFrom,
      properties,
      unlockableContent,
      copies,
      // royalities,
      // signer,
    } = req.body;

    if (!req.store?.storeId || !req.store?.package)
      throw new BadRequestError("Store not found");
    if (!req.currentUser?.id) throw new NotAuthorizedError();

    let collectonOwner = await Collection.findOne({ _id: collectionId }).exec();
    if (!collectonOwner) throw new BadRequestError("Collection not found");
    if (collectonOwner.userId !== req.currentUser.id)
      throw new BadRequestError("You cannot create nft for this collection");

    // if (req.store?.isLazyMintingContract === true && !signer)
    //   throw new BadRequestError("signer is required for lazy minting");

    let totalStoreNftCount = await NftCollection.find({
      storeId: req.store?.storeId,
    })
      .countDocuments()
      .exec();

    if (
      totalStoreNftCount >= req.store.package?.product_limit &&
      req.store.package?.unlimited_product !== true
    )
      throw new BadRequestError("Product limit reached");

    // check whether it is shared contract store (if it is shared, check whether the owner is the minter)
    if (req.store.type === "single_store") {
      if (mintFrom !== req.store.metamaskId) {
        throw new BadRequestError(
          "Sorry, only store owner can mint from this store"
        );
      }
    }

    // erc 1155 condition
    if (req.store?.contractStandard === "erc1155") {
    } else if (req.store?.contractStandard === "erc721") {
      if (copies !== 1) {
        throw new BadRequestError("invalid_parameter_error:__number-of-copies");
      }
    }

    try {
      // setting userIds according to number of copies
      let userIds = [req.currentUser.id];

      let userDetails = await User.findOne({ _id: req.currentUser.id });

      

      // token standard
      let tokenStandard = req.store?.contractStandard;
      if (req.store?.contractStandard === "combinedContract") {
        if (copies === 1) {
          tokenStandard = "erc721";
        } else {
          tokenStandard = "erc1155";
        }
      }

      let ownersDetails = [
        {
          userId: req.currentUser.id,
          // name: userDetails?.name,
          // profile: userDetails?.profile,
          // username: userDetails?.username,
          // email: userDetails?.email,
          metamaskId: userDetails?.metamaskId,
          isListed: false,
          ...(tokenStandard === "erc1155" && {
            numberOfCopies: copies,
          }),
        },
      ];

      // // Calculation of tokenIdForLazyMint
      // let newTokenIdForLazyMint = null;

      // if (
      //   req.store?.type === "marketplace" &&
      //   req.store.isLazyMintingContract === true
      // ) {
      //   let highestTokenIdOfThisStore = await NftCollection.findOne({
      //     storeId: req.store.storeId,
      //     isLazyMint: true,
      //   })
      //     .sort({ tokenIdForLazyMint: -1 })
      //     .limit(1);

      //   let latestTokenId = highestTokenIdOfThisStore?.tokenIdForLazyMint;

      //   newTokenIdForLazyMint = latestTokenId ? latestTokenId + 1 : 1;
      // } else if (
      //   req.store?.type === "single_store" &&
      //   req.store.isLazyMintingContract === true
      // ) {
      //   let highestTokenIdOfSharedStore = await NftCollection.findOne({
      //     type: "single_store",
      //     isLazyMint: true,
      //   })
      //     .sort({ tokenIdForLazyMint: -1 })
      //     .limit(1);

      //   let latestTokenId = highestTokenIdOfSharedStore?.tokenIdForLazyMint;

      //   newTokenIdForLazyMint = latestTokenId ? latestTokenId + 1 : 1;
      // }

      // finding latest id for lazy minting
      let latestLazyMintIdCounter: any = null
      let newLazyMintId = 0
      if (req.store.isLazyMintingContract === true) {
        latestLazyMintIdCounter = await TokenIdSalesIdAuctionId.findOne({
          ...(req.store.type === 'marketplace' ? {contractType: 'marketplace'} : {contractType: 'single_store'}),
          ...(req.store.type === 'marketplace' && {storeId: req.store.storeId} ),
          type: 'tokenId',
        }).sort({ _id: -1 })

        newLazyMintId = latestLazyMintIdCounter?.counter

        if (!latestLazyMintIdCounter) {
          let newCounterDocument = TokenIdSalesIdAuctionId.build({
            ...(req.store.type === 'marketplace' ? {contractType: 'marketplace'} : {contractType: 'single_store'}),
            ...(req.store.type === 'marketplace' ? {storeId: req.store.storeId} : {storeId: null} ),
            ...(req.store.type === 'marketplace' ? {clientId: req.store.clientId} : {clientId: null} ),
            type: 'tokenId',
            counter: 1
          })

          let savedCounter = await newCounterDocument.save()

          newLazyMintId = savedCounter.counter
        }
      }

      console.log('newLazyff',newLazyMintId)

      let date = new Date()
      console.log('CURRENT DATE == ',date)

      let nftBuild = NftCollection.build({
        name,
        collectionId,
        description,
        storeId: req.store.storeId,
        address,
        tokenId: req.store?.isLazyMintingContract === true ? newLazyMintId : tokenId,
        uri,
        userId: userIds,
        mintFrom,
        createdBy: req.currentUser.id,
        properties,
        unlockableContent,
        numberOfCopies: copies,
        tokenStandard,
        ownersDetails: ownersDetails,
        // royalities,
        // ...(req.store?.contractStandard === 'erc721' && {isFirstSale: true})
        isFirstSale: true,
        ...(req.store?.isLazyMintingContract === true && { isLazyMint: true }),
        // ...(req.store?.isLazyMintingContract === true && { signer }),
      });

      let savedNftData = await nftBuild.save();

      // indian time
      let indianTime = getIstTime();

      // adding event to history
      let historyEventData = new NftHistory({
        nftId: savedNftData._id,
        events: [
          {
            eventName: "mint",
            userId: req.currentUser.id,
            fromMetamaskId: mintFrom,
            date: indianTime,
            numberOfCopies: copies,
          },
        ],
      });

      await historyEventData.save();


      // incrementing tokenId by one
      if (req.store.isLazyMintingContract === true) {
        await TokenIdSalesIdAuctionId.updateOne({
          ...(req.store.type === 'marketplace' ? {contractType: 'marketplace'} : {contractType: 'single_store'}),
          ...(req.store.type === 'marketplace' && {storeId: req.store.storeId} ),
          type: 'tokenId',
        }, {
          $inc: {
            counter: 1
          }
        })
      }

      res.json({
        status: true,
        data: nftBuild,
        message: "Nft Created Successfully",
      });
    } catch (error) {
      console.log("create--errroor-->", error);
      throw new Error();
    }
  }
);

export { router as createNFTRouter };
