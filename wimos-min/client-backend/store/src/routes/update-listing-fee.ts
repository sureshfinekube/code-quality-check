import { BadRequestError } from "@finekube/nft-client-common";
import express, { Request, Response } from "express";
import { Store } from "../models/store";

const router = express.Router();

router.put("/", async (req: Request, res: Response) => {
  try {
    // body
    let { storeId, metamaskId, listingFee } = req.body;

    if (!storeId || !metamaskId || !listingFee)
      throw new BadRequestError("Required params missing");

      console.log('params-in-update=',storeId,'-',metamaskId,'-',listingFee)

    // Finding the store with the domain
    let store = await Store.findOne({ _id: storeId });

    // If store not found
    if (!store) throw new BadRequestError("Store not found");

    console.log("store-got-in-update",store)

    console.log('comparers-in-update=',store.metamaskId,'-',metamaskId)

    // check whether the user is client (with metamaskId)
    if (store.metamaskId !== metamaskId)
      throw new BadRequestError(
        "Unauthorized: This option is only available to store owner's account"
      );

    // check whether that updating with new fee or not
    if (store.listingFee == listingFee) {
        return res.status(200).json({
            status: true,
            message: 'There is no change in fee'
        })
    }

    listingFee = parseFloat(listingFee);

    let updatedValue = await Store.updateOne(
      { _id: storeId },
      {
        listingFee,
      }
    );

    // if (updatedValue?.modifiedCount == 1) {
      //send the response
      return res.status(200).json({
        status: true,
        message: 'Listing fee updated successfully'
      });
    // } else {
    //   //not updated the response
    //   return res.status(400).json({
    //     status: false,
    //     message: 'Not updated'
    //   });
    // }
  } catch (err) {
    throw new Error();
  }
});

export { router as updateListingFee };
