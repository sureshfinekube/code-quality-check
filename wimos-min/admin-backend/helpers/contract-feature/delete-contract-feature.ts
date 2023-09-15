import mongoose from "mongoose";
import { CONTRACT_FEATURE_COLLECTION } from "../../config/mongoose/collections";
import contractFeatureSchema from "../../model/contractFeatureSchema";

const deleteContractFeature = (id: string) => {
    return new Promise(async (resolve, reject) => {
        try {

            const contractFeatureModel = mongoose.model(CONTRACT_FEATURE_COLLECTION, contractFeatureSchema);

            // check whether id is valid or not
            let isValidContractFeature = await contractFeatureModel.findById(id)

            if (!isValidContractFeature) return reject({ status: false, message: 'Invalid id' })

            // delete contract feature
            contractFeatureModel.deleteOne({ _id: id }).then((resopnse) => {
                resolve({ status: true, message: 'Contract Feature Deleted Successfully' })
            }).catch((err) => {
                reject({ status: false, message: "Something went wrong on deleting" })
            });

        } catch (err) {
            reject({ status: false, message: "Something went wrong" });
        }
    })
};

export default deleteContractFeature;