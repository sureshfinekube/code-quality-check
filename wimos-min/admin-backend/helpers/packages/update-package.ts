
import mongoose from "mongoose";
import { PACKAGES_COLLECTION } from "../../config/mongoose/collections";
import packageSchema from "../../model/packagesSchema";

const updatePackage = (data) => {

    let {
        id,
        name,
        type,
        features,
        amount,
        unlimited_product,
        unlimited_page,
        unlimited_store,
        product_limit,
        page_limit,
        store_limit,
        description,

        unlimited_user,
        unlimited_collection,
        user_limit,
        collection_limit

    } = data;

    return new Promise(async (resolve, reject) => {
        try {
            const packageModel = await mongoose.model(PACKAGES_COLLECTION, packageSchema);
            const packageFound = await packageModel.findOne({ _id: id });
            if (packageFound) {
                packageModel.findOneAndUpdate(
                    { _id: id },
                    {
                        $set: {
                            name,
                            type,
                            features,
                            amount,
                            unlimited_product,
                            unlimited_page,
                            unlimited_store,
                            product_limit,
                            page_limit,
                            store_limit,
                            description,

                            unlimited_user,
                            unlimited_collection,
                            user_limit,
                            collection_limit

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

export default updatePackage;