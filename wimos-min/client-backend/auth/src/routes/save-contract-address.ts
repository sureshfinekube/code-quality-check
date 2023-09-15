import {
  BadRequestError,
  Bcrypt,
  validateRequest,
  currentClient,
  NotAuthorizedError,
} from "@finekube/nft-client-common";
import express, { Response, Request } from "express";
import { CreateApiContract } from "../models/contract";
import { FreePackage } from '../services/get-free-package'; 
import { Client } from '../models/client';
import { Store } from "../models/store";

const router = express.Router();

router.post(
  "/",
  currentClient,
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      // Check the client is authenticated
      if (!req?.currentClient?.id) {
        throw new NotAuthorizedError();
      }

      let clientId = req.currentClient.id;
      let { storeId, chainId, nftContractAddress, marketplaceContractAddress, realMarketplaceContractAddress } =
        req.body;

      if (
        !storeId ||
        !chainId ||
        !nftContractAddress ||
        !marketplaceContractAddress ||
        !realMarketplaceContractAddress
      )
        throw new BadRequestError("Required params missing");

      let isValidStore = await Store.findOne({ _id: storeId })
      if (!isValidStore) throw new BadRequestError('Invalid storeId')


      let savedAbiData = await CreateApiContract.findOne({
        userId: clientId,
        storeId,
      });

      if (!savedAbiData) throw new BadRequestError("ABI data not found");

      // Adding free package id to the client
      let freePackage = await FreePackage.fetch();
      if (freePackage.status) {
        await Client.updateOne(
          { _id: req.currentClient.id },
          { $set: { packageId: freePackage?.freePackageData?._id } }
        );
      }

      // update contract addresses to abis
      await CreateApiContract.updateOne(
        {
          userId: clientId,
          storeId: storeId,
        },
        {
          $set: {
            chainId: chainId,
            "nftContract.contract_address": nftContractAddress,
            // ...(isValidStore?.isLazyMintingContract ? {"marketPlaceContract.contract_address": realMarketplaceContractAddress} : {"marketPlaceContract.contract_address": marketplaceContractAddress}),
            ...({"marketPlaceContract.contract_address": marketplaceContractAddress}),

            "realMarketplaceContractAddress.contract_address": realMarketplaceContractAddress
          },
        }
      );

      // success response
      return res.status(200).json({
        status: true,
        message: "Contract addresses saved successfully",
      });
    } catch (error) {
      throw new Error();
    }
  }
);

export { router as saveContractAddress };
