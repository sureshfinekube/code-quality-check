
import mongoose from "mongoose";
import { PACKAGES_COLLECTION } from "../../config/mongoose/collections";
import packageSchema from "../../model/packagesSchema";

const addStripeToPackage = (id, proId, priceId: any) => {

    return new Promise(async (resolve, reject) => {
        try {
            const packageModel = mongoose.model(PACKAGES_COLLECTION, packageSchema);
            const packageFound = await packageModel.findOne({ _id: id });
            if (packageFound) {
                packageModel.findOneAndUpdate(
                    { _id: id },
                    {
                        $set: {
                            stripe_product_id: proId,
                            stripe_price_id: priceId
                        }
                    }, {
                    new: true
                }
                )
                    .then(function (updatedDoc) {
                        // if update is successful, this function will execute
                        resolve({ status: true, message: "Updated Successfully", package: updatedDoc })

                    }, function (err) {
                        // if an error occured, this function will execute
                        reject({ status: false, message: "Failed while updating" })
                    })
                    .catch((err) => {
                        reject({ status: false, message: "Failed while Updating" })
                    })
            } else {
                reject({ status: false, message: "Package not found" })
            }
        }
        catch (err) {
            reject({ status: false, message: "Something went wrong" });
        }
    })
};

export default addStripeToPackage;