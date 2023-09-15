import express, { Request, Response } from "express";
import { BadRequestError } from "../../middlewares/custom-err/bad-request-error";
import { NftCollection } from "../../models/nfts";
import { currentUser } from "../../middlewares/current-user";
import { NftLike } from "../../models/nft-likes";
const router = express.Router();

router.get("/", currentUser, async (req: Request, res: Response) => {
  if (!req.store?.storeId) throw new BadRequestError("Store not found");

  let till_this_page: any = req.query.till_this_page;
  let page: any = req.query?.page;
  let limit = 15;
  let collection = req.query?.collection;
  let category = req.query?.category;
  let type = req.query?.sale_type;
  let firstPrice: any = req.query?.price_1 ? +req.query?.price_1 : "";
  let lastPrice: any = req.query?.price_2 ? +req.query?.price_2 : "";
  let minusPage: any = page - 1 || 0;
  let skip = limit * minusPage;

  let searchQuery: any = [{ storeId: req.store?.storeId }];

  if (collection && collection !== "undefined")
    searchQuery.push({ collectionId: collection });
  if (type && type !== "undefined") {
    if (type === "auction" || type === "fixed") {
      searchQuery.push({ type });
    } else {
      searchQuery.push({ type: null });
    }
  }

  if (firstPrice && lastPrice) {
    if (firstPrice !== 0 || lastPrice !== 5) {
      console.log("1");

      if (type === "fixed") {
        console.log("2");

        searchQuery.push({ price: { $gte: firstPrice, $lte: lastPrice } });
        // if (!type || type == "undefined") searchQuery.push({ type: "fixed" });
      } else if (type === "auction") {
        console.log("3");

        searchQuery.push({
          startingPrice: { $gte: firstPrice, $lte: lastPrice },
        });
      } else if (!type || type === "undefined") {
        console.log("4");

        searchQuery.push({ type: "fixed" });
        searchQuery.push({ price: { $gte: firstPrice, $lte: lastPrice } });
      }
    }
  }
  console.log("searrrrrr", searchQuery);
  //  else if (firstPrice && lastPrice && type && type === "auction") {
  //   searchQuery.push({ startingPrice: { $gte: firstPrice , $lte: lastPrice} });
  // }

  // let limit = parseInt(req.body.limit) || 10
  // let page = parseInt(req.body.page) - 1 || 0
  // var query = {};
  // let users = await Users.find({}).sort({ createdAt: -1 }).skip(limit * page).limit(limit).select("fields you want to select separated by space")
  // const count = await Users.countDocuments(query);
  // let obj = {
  //   Users: users,
  //   total: count,
  //   limit: limit,
  //   page: page + 1
  // }

  try {
    let totalCount = await NftCollection.countDocuments({
      $and: searchQuery,
    });

    NftCollection.aggregate([
      {
        $match: {
          // storeId: req.store?.storeId,
          // ...(collection && collection !== 'undefined' && {collectionId:collection}),
          // ...(type && type !== 'undefined' && { type }),
          // ...(type === 'not-for-sale' && { type: null }),
          // ...(firstPrice && lastPrice && firstPrice !== 0 || lastPrice !== 100 && { price: {$gte: 0, $lte: 0}})
          $and: searchQuery,
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $addFields: {
          userId: {
            $cond: {
              if: {
                $eq: [
                  {
                    $type: "$userId",
                  },
                  "array",
                ],
              },
              then: "$userId",
              else: {
                $convert: {
                  input: "$userId",
                  to: "array",
                  onError: ["$userId"],
                },
              },
            },
          },
          collectionId: {
            $toObjectId: "$collectionId",
          },
        },
      },
      // {
      //   $match: {
      //     collectionId: "6346c448976a3ac71cc16b42",
      //   },
      // },
      {
        $addFields: {
          userId: {
            $map: {
              input: "$userId",
              as: "u",
              in: { $toObjectId: "$$u" },
            },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          let: { user_id: "$userId" },
          pipeline: [
            { $match: { $expr: { $in: ["$_id", "$$user_id"] } } },
            {
              $project: {
                _id: 1,
                name: 1,
                email: 1,
                username: 1,
                bio: 1,
                profile: 1,
                cover: 1,
                metamaskId: 1,
              },
            },
          ],
          as: "users_details",
        },
      },
      {
        $lookup: {
          from: "collections",
          localField: "collectionId",
          foreignField: "_id",
          as: "collectionData",
        },
      },
      {
        $unwind: {
          path: "$collectionData",
        },
      },
      {
        $match: {
          ...(category &&
            category !== "undefined" && {
              "collectionData.category": category,
            }),

          $or: [
            {
              "collectionData.userId": req.currentUser?.id,
            },
            {
              "collectionData.isHidden": false,
            },
            {
              $expr: {
                $eq: [
                  {
                    $type: "$collectionData.isHidden",
                  },
                  "missing",
                ],
              },
            },
          ],
        },
      },

      // finding highest bid - if type is auction
      // {
      //   $addFields: {
      //     highestBid: {
      //       $reduce: {
      //         input: "$auctionOffers",
      //         initialValue: {
      //           price: null,
      //         },
      //         in: {
      //           $cond: [
      //             {
      //               $gte: ["$$this.price", "$$value.price"],
      //             },
      //             "$$this",
      //             "$$value",
      //           ],
      //         },
      //       },
      //     },
      //   },
      // },

      // Price filtering of auction NFTs starts
      // match price with highest bid price if highestBid.price is not null and type is auction

      // matching with startingPrice if this nft is type 'auction' otherwise with price (if type is not passed in query) - starts
      // {
      //   $match: {
      //     ...(!type && firstPrice !== 0 && lastPrice !== 5 &&
      //     {$or: [
      //       {type: {$ne: 'auction'}},
      //       {startingPrice: {$gte: firstPrice, $lte: lastPrice}}
      //     ]})
      //   }
      // },
      // {
      //   $match: {
      //     ...(!type && firstPrice !== 0 && lastPrice !== 5 &&
      //     {$or: [
      //       {type: {$ne: 'fixed'}},
      //       {price: {$gte: firstPrice, $lte: lastPrice}}
      //     ]})
      //   }
      // },
      // matching with startingPrice if this nft is type 'auction' otherwise with price (if type is not passed in query) - ends

      // match price with starting price if highestBid.price is null and type is auction
      // {

      // },
      // Price filtering of auction NFTs ends

      {
        $addFields: {
          // nameOfSeller: "$user.name",
          // emailOfSeller: "$user.email",
          // usernameOfSeller: "$user.username",
          // bioOfSeller: "$user.bio",
          // profileOfSeller: "$user.profile",
          // coverOfSeller:"$user.cover",
          collectionName: "$collectionData.name",
          collectionRoyalities: "$collectionData.royalities",
          userId: "$userId",
          collectionId: {
            $toString: "$collectionId",
          },
          id: "$_id",
        },
      },

      // {
      //   $addFields: {
      //     listings: {
      //       $map: {
      //         input: "$listings",
      //         in: {
      //           fromUserId: {
      //             $toObjectId: "$$this.fromUserId",
      //           },
      //           fromMetamaskId: "$$this.fromMetamaskId",
      //           unitPrice: "$$this.unitPrice",
      //           quantity: "$$this.quantity",
      //           _id: "$$this._id",
      //         },
      //       },
      //     },
      //   },
      // },

      // populating user data of listings
      {
        $unwind: {
          path: "$listings",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $lookup: {
          from: "users",
          let: { listing_user_id: { $toObjectId: "$listings.fromUserId" } },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$listing_user_id"] } } },
            {
              $project: {
                name: 1,
                username: 1,
                profile: 1,
              },
            },
          ],
          as: "listings.userData",
        },
      },

      {
        $addFields: {
          "listings.userData": { $first: "$listings.userData" },
        },
      },

      {
        $unwind: {
          path: "$ownersDetails",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $lookup: {
          from: "users",
          let: { owners_user_id: { $toObjectId: "$ownersDetails.userId" } },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$owners_user_id"] } } },
            {
              $project: {
                name: 1,
                username: 1,
                profile: 1,
                email: 1,
              },
            },
          ],
          as: "ownersDetails.userData",
        },
      },

      {
        $addFields: {
          "ownersDetails.userData": { $first: "$ownersDetails.userData" },
        },
      },

      // {
      //   $group: {
      //     _id: "$id",
      //     "storeId": {$first: "$storeId"},
      //     "collectionId": {$first: "$collectionId"},
      //     "name": {$first: "$name"},
      //     "description": {$first: "$description"},
      //     "tokenId": {$first: "$tokenId"},
      //     "address": {$first: "$address"},
      //     "uri": {$first: "$uri"},
      //     "mintFrom": {$first: "$stomintFromreId"},
      //     "createdBy": {$first: "$createdBy"},
      //     "type": {$first: "$type"},
      //     "numberOfCopies": {$first: "$numberOfCopies"},
      //     "royalties": {$first: "$royalties"},
      //     "price": {$first: "$price"},
      //     "startingPrice": {$first: "$startingPrice"},
      //     "endDate": {$first: "$endDate"},
      //     "endTime": {$first: "$endTime"},
      //     "createdAt": {$first: "$createdAt"},
      //     "updatedAt": {$first: "$updatedAt"},
      //     "listed": {$first: "$listed"},
      //     "status": {$first: "$status"},
      //     "properties": {$push: "$properties"},
      //     "tokenStandard": {$first: "$tokenStandard"},
      //     "ownersDetails": {$push: "$ownerDetails"},
      //     "listings": {$push: "$listings"},
      //     "users_details": {$push: "$users_details"},
      //     "collectionName": {$first: "$collectionName"},
      //     "id": {$first: "$id"}
      //   }
      // },

      // populating user data of bidOffers
      {
        $unwind: {
          path: "$bidOffers",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $lookup: {
          from: "users",
          let: { offer_user_id: { $toObjectId: "$bidOffers.userId" } },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$offer_user_id"] } } },
            {
              $project: {
                name: 1,
                username: 1,
                profile: 1,
              },
            },
          ],
          as: "bidOffers.userData",
        },
      },

      {
        $addFields: {
          "bidOffers.userData": { $first: "$bidOffers.userData" },
        },
      },

      // checking whether this user is liked or not\
      // {
      //   $lookup: {
      //     from: 'nftLikes',
      //     foreignField: 'userId',
      //     localField: req.currentUser?.id,
      //     as: 'likedUser'
      //   }
      // },

      {
        $group: {
          _id: "$id",
          userId: { $first: "$userId" },
          storeId: { $first: "$storeId" },
          collectionId: { $first: "$collectionId" },
          name: { $first: "$name" },
          description: { $first: "$description" },
          tokenId: { $first: "$tokenId" },
          address: { $first: "$address" },
          uri: { $first: "$uri" },
          mintFrom: { $first: "$mintFrom" },
          createdBy: { $first: "$createdBy" },
          type: { $first: "$type" },
          numberOfCopies: { $first: "$numberOfCopies" },
          // "royalities": {$first: "$royalities"},
          price: { $first: "$price" },
          startingPrice: { $first: "$startingPrice" },
          endDate: { $first: "$endDate" },
          endTime: { $first: "$endTime" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          listed: { $first: "$listed" },
          status: { $first: "$status" },
          properties: { $first: "$properties" },
          tokenStandard: { $first: "$tokenStandard" },
          // ...(req.store.contractStandard === "erc1155" && {
          ownersDetails: { $addToSet: "$ownersDetails" },
          // }),
          // ...(req.store.contractStandard === "erc1155" && {
          listings: {
            $addToSet: {
              $cond: [{ $gt: ["$listings", {}] }, "$listings", "$$REMOVE"],
            },
          },
          // }),
          // ...(req.store.contractStandard === "erc721" && {
          bidOffers: {
            $addToSet: {
              $cond: [{ $gt: ["$bidOffers", {}] }, "$bidOffers", "$$REMOVE"],
            },
          },
          // }),
          users_details: { $first: "$users_details" },
          collectionName: { $first: "$collectionName" },
          collectionRoyalities: { $first: "$collectionRoyalities" },
          auctionOffers: { $first: "$auctionOffers" },
          isFirstSale: { $first: "$isFirstSale" },
          likes_count: { $first: "$likes_count" },
          salesId: { $first: "$salesId" },
          auctionId: { $first: "$auctionId" },
          isAuctionCompletelyEnded: { $first: "$isAuctionCompletelyEnded" },
          signer: { $first: "$signer" },
          signature: { $first: "$signature" },
          id: { $first: "$id" },
        },
      },

      // {
      //   $unwind: {
      //     path: "$listings.userData",
      //     preserveNullAndEmptyArrays: true
      //   }
      // },

      // { $group: {
      //   _id: "$_id",
      //   listings: { "$push": "$listings" },
      //   // "cartId" : { "$first": "$cartId" },
      //   // "supplierId" : { "$first": "$supplierId" },
      // }},

      // {
      //   $lookup:
      //   // {
      //   //   from: "users",
      //   //   localField: "listings.fromUserId",
      //   //   foreignField: "_id",
      //   //   as: "listingUserDetails",
      //   // },
      //   {
      //       from: "users",
      //       let: { user_Id: "$listings.fromUserId" },
      //       pipeline: [
      //         { $match: { listings: { $exists: true, $not: {$size: 0} } } },
      //         { $match: { $expr: { $in: ["$_id", "$$user_Id"] } } },
      //         {
      //           $project: {
      //             _id: 0,
      //             name: 1,
      //             username: 1,
      //             profile: 1,
      //           },
      //         },
      //       ],
      //       as: "listingUserDetails",
      //     },
      // },
      // {
      //   $addFields: {
      //     listings: {
      //       $map: {
      //         input: "$listings",
      //         as: "i",
      //         in: {
      //           $mergeObjects: [
      //             "$$i",
      //             { $arrayElemAt: ["$listingUserDetails", 0] },
      //           ],
      //         },
      //       },
      //     },
      //   },
      // },
      {
        $project: {
          user: 0,
          _id: 0,
          collectionData: 0,
          listingUserDetails: 0,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]).exec(async (err, nfts) => {
      if (err) {
        console.log("query-error==>", err);
        return res.json({
          status: false,
          msg: "Sorry, there is an error in fetching NFTs. Please try again after some time ...",
        });
        // throw new Error();
      } else {
        // let responseArray: any = [];

        for (let i of nfts) {
          // removing unlockable content
          if (req.currentUser?.id) {
            // check isLiked
            let isLiked = await NftLike.findOne({
              nftId: i?.id + "",
              userId: req.currentUser?.id,
            });
            if (isLiked) {
              i.isLiked = true;
            } else {
              i.isLiked = false;
            }
          }

          // checking whether auction nfts' enddate crossed, if crossed do the neccessary updates
          // in this fetched items and update those in db
          if (i.listed === true && i.type === "auction" && !i.isAuctionEnded) {
            let auctionEndedNfts = [];
            let currentDate = new Date();

            if (currentDate >= i.endDate) {
              i.isAuctionEnded = true;
              auctionEndedNfts.push(i.id);
            }

            if (auctionEndedNfts.length) {
              await NftCollection.updateMany(
                { _id: { $in: auctionEndedNfts } },
                {
                  $set: {
                    isAuctionEnded: true,
                  },
                }
              );
            }
          }

          // Checking for end date of fixed sale
          if (i.listed === true && i.type === 'fixed' && !i.isFixedSaleEnded && i.endDate) {
            let fixedSaleEndedNfts = []
            let currentDate = new Date()

            if (currentDate >= i.endDate) {
              i.isFixedSaleEnded = true 
              fixedSaleEndedNfts.push(i.id)     
            }

            if (fixedSaleEndedNfts.length) {
              await NftCollection.updateMany({_id: {$in: fixedSaleEndedNfts}}, {
                $set: {
                  isFixedSaleEnded: true,
                  price: null,
                  type: null,
                  startingPrice: null,
                  endDate: null,
                  endTime: null,
                  listed: false,
                  status: false
                }
              })
            }
          }

        }

        let totalPages = Math.ceil(totalCount / limit);

        res.json({ status: true, data: nfts, totalPages });
      }
    });
  } catch (error) {
    throw new Error();
  }
});

export { router as getNftsRouter };
