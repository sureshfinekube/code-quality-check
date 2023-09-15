
import mongoose from "mongoose";
import { PACKAGES_COLLECTION } from "../../config/mongoose/collections";
import packageSchema from "../../model/packagesSchema";

const removePackage = (id: string) => {

    return new Promise(async (resolve, reject) => {
        const packageModel = mongoose.model(PACKAGES_COLLECTION, packageSchema);
        const packageFound = await packageModel.findOne({ _id: id });
        if (packageFound) {
            try {
                await packageModel.deleteOne({ _id: id })
                resolve({ status: true })
            }
            catch (err) {
                reject({ status: false })
            }

        } else {
            reject({ status: false })
        }
    })
};

export default removePackage;