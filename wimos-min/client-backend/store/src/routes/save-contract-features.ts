import express, { Request, Response } from "express";
import {
  BadRequestError,
  currentClient,
  NotAuthorizedError,
  requireAuth,
  validateRequest,
} from "@finekube/nft-client-common";

const router = express.Router();

import { Store } from "../models/store";

router.put(
  "/",
  currentClient,
  requireAuth,
  validateRequest,

  async (req: Request, res: Response) => {
    let {
      storeId,
      mintable,
      burnable,
      uriStorage,
      pausable,
      votes,
      enumerable,
      uri,
      supply,
      isLazyMintingContract,
    } = req.body;

    if (!req.body?.storeId)
      throw new BadRequestError(
        "Required params missing: field 'storeId'"
      );

    let isValidStore = await Store.findOne({_id: storeId})
    if (!isValidStore) throw new BadRequestError('Invalid storeId')

    if (!req.body?.contractStandard)
      throw new BadRequestError(
        "Required params missing: field 'contractStandard'"
      );

    // if (!req.body?.isLazyMintingContract)
    //   throw new BadRequestError(
    //     "Required params missing: field 'isLazyMintingContract'"
    //   );

    // checking body values
    if (isValidStore.type === 'marketplace' && req.body?.contractStandard == "erc721" && !isLazyMintingContract) {
      if (
        !req.body.hasOwnProperty("storeId") ||
        !req.body.hasOwnProperty("mintable") ||
        !req.body.hasOwnProperty("burnable") ||
        !req.body.hasOwnProperty("uriStorage") ||
        !req.body.hasOwnProperty("pausable") ||
        !req.body.hasOwnProperty("votes") ||
        !req.body.hasOwnProperty("enumerable")
      )
        throw new BadRequestError("Required values missing");
    } else if (isValidStore.type === 'marketplace' && req.body?.contractStandard == "erc1155" && !isLazyMintingContract) {
      if (
        !req.body.hasOwnProperty("storeId") ||
        !req.body.hasOwnProperty("mintable") ||
        !req.body.hasOwnProperty("burnable") ||
        !req.body.hasOwnProperty("pausable") ||
        !req.body.hasOwnProperty("supply")
      )
        throw new BadRequestError("Required values missing");
    } else if (isValidStore.type === 'marketplace' && req.body?.contractStandard == "combinedContract" && !isLazyMintingContract) {
      if (
        !req.body.hasOwnProperty("storeId") ||
        !req.body.hasOwnProperty("mintable") ||
        !req.body.hasOwnProperty("burnable") ||
        !req.body.hasOwnProperty("pausable") ||
        !req.body.hasOwnProperty("supply")
      )
        throw new BadRequestError("Required values missing");
    }

    try {
      // // lazy minting condition
      // if (req.body.hasOwnProperty("isLazyMintingContract") && isLazyMintingContract) {
      //   await Store.updateOne(
      //     { _id: storeId },
      //     {
      //       $set: {
      //         isLazyMintingContract
      //       },
      //     }
      //   );
      // } else {
      //   // updating contract features
      //   if (req.body?.contractStandard == "erc721") {
      //     await Store.updateOne(
      //       { _id: storeId },
      //       {
      //         $set: {
      //           "contractFeatures.mintable": mintable,
      //           "contractFeatures.burnable": burnable,
      //           "contractFeatures.uriStorage": uriStorage,
      //           "contractFeatures.pausable": pausable,
      //           "contractFeatures.votes": votes,
      //           "contractFeatures.enumerable": enumerable,
      //           isLazyMintingContract: false,
      //           marketplaceTemplate: 
      //         },
      //       }
      //     );
      //   } else if (req.body?.contractStandard == "erc1155") {
      //     await Store.updateOne(
      //       { _id: storeId },
      //       {
      //         $set: {
      //           "contractFeatures.mintable": mintable,
      //           "contractFeatures.burnable": burnable,
      //           "contractFeatures.pausable": pausable,
      //           "contractFeatures.supply": supply,
      //           isLazyMintingContract: false
      //         },
      //       }
      //     );
      //   }

      
        // updating contract features and other contract data
        if (isValidStore.type === 'marketplace' && req.body?.contractStandard == "erc721" && !isLazyMintingContract) {
          await Store.updateOne(
            { _id: storeId },
            {
              $set: {
                "contractFeatures.mintable": mintable,
                "contractFeatures.burnable": burnable,
                "contractFeatures.uriStorage": uriStorage,
                "contractFeatures.pausable": pausable,
                "contractFeatures.votes": votes,
                "contractFeatures.enumerable": enumerable,
                isLazyMintingContract
              },
            }
          );
        } else if (isValidStore.type === 'marketplace' && req.body?.contractStandard == "erc1155" && !isLazyMintingContract) {
          await Store.updateOne(
            { _id: storeId },
            {
              $set: {
                "contractFeatures.mintable": mintable,
                "contractFeatures.burnable": burnable,
                "contractFeatures.pausable": pausable,
                "contractFeatures.supply": supply,
                isLazyMintingContract
              },
            }
          );
        } else if (isLazyMintingContract) {
          await Store.updateOne(
            { _id: storeId },
            {
              $set: {
                isLazyMintingContract,
              },
            }
          );
        }

      return res
        .status(200)
        .json({ status: true, message: "contract features updated" });
    } catch (error) {
      throw new BadRequestError("Something went wrong");
    }
  }
);

export { router as contractFeatures };
