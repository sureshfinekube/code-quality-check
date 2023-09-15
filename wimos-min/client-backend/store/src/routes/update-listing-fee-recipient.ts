import {
  BadRequestError,
  currentUser,
  requireUserAuth,
} from "@finekube/nft-client-common";
import express, { Request, Response } from "express";
import { Store } from "../models/store";
import mongoose from "mongoose";

const router = express.Router();

router.put(
  "/",
  currentUser,
  requireUserAuth,
  async (req: Request, res: Response) => {
    // body
    let { storeId, metamaskId, percentage, id } = req.body;

    // console.log('in update reciii',storeId, metamaskId, id)

    if (!storeId || !metamaskId || !percentage || !id)
      throw new BadRequestError("Required params missing");

    // Finding the store with the domain
    let store = await Store.findOne({ _id: storeId });

    // If store not found
    if (!store) throw new BadRequestError("Store not found");

    try {
      // check whether the user is client (with metamaskId)
      // if (store.metamaskId !== metamaskId)
      //   throw new BadRequestError(
      //     "Unauthorized: This option is only available to store owner's account"
      // );

      // Unique metamaskId validation
      let isThisAddressAlreadyAdded = store?.listingFeeRecipients.find((e:any) => e.metamaskId == metamaskId && e._id+'' !== id+'')
      if (isThisAddressAlreadyAdded) {
        return res.status(400).json({
          errors: [{
            message: "This address already added as recipient."
          }]
        })
      }

      // Total percentage validation
      let recipientsOtherThanCurrentOne = store?.listingFeeRecipients.filter((e:any) => e._id+'' !== id)
      let totalOfAllCurrentPercentages = recipientsOtherThanCurrentOne.reduce((accumulator: any, current: any) => +accumulator + +current.percentage, 0);
      if (totalOfAllCurrentPercentages + +percentage > 100) {
        return res.status(400).json({
          errors: [
            {
              message: "Invalid percentage value. Total percentage should not exceed 100.",
            },
          ],
        });
      }

      await Store.updateOne(
        {
          _id: storeId,
          "listingFeeRecipients._id": new mongoose.Types.ObjectId(id),
        },
        {
          $set: {
            "listingFeeRecipients.$.metamaskId": metamaskId,
            "listingFeeRecipients.$.percentage": percentage,
          },
        }
      );

      return res.status(200).json({
        status: true,
        message: "Recipient updated successfully",
      });
    } catch (err) {
      throw new Error();
    }
  }
);

export { router as updateListingFeeRecipient };
