import mongoose from "mongoose";
import { CONTRACT_FEATURE_COLLECTION } from "../../config/mongoose/collections";
import contractFeatureSchema from "../../model/contractFeatureSchema";

const updateContractFeature = (id: string, name: string, type: string, description: string, amount: string) => {
    return new Promise(async (resolve, reject) => {
        try {

            const contractFeatureModel = mongoose.model(CONTRACT_FEATURE_COLLECTION, contractFeatureSchema);

            // check whether id is valid or not
            let isValidContractFeature = await contractFeatureModel.findById(id)

            if (!isValidContractFeature) return reject({ status: false, message: 'Invalid id' })

            // existing name validation
            let isContractFeatureExist = await contractFeatureModel.findOne({ name, _id: { $ne: id } });

            if (isContractFeatureExist) return reject({ status: false, message: "Sorry, contract feature with this name already exists!" });

            // update contract feature
            amount = amount.toString()
            contractFeatureModel.updateOne({ _id: id }, {
                name,
                type,
                description,
                amount
            }).then((payload) => {
                resolve({ status: true, message: 'Contract Feature Updated Successfully' })
            }).catch((err) => {
                reject({ status: false, message: "Something went wrong on updating" })
            });

        } catch (err) {
            reject({ status: false, message: "Something went wrong" });
        }
    })
};

export default updateContractFeature;