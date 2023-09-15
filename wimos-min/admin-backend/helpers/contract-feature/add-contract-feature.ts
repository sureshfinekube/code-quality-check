import mongoose from "mongoose";
import { CONTRACT_FEATURE_COLLECTION } from "../../config/mongoose/collections";
import contractFeatureSchema from "../../model/contractFeatureSchema";

const addContractFeature = (name: string, type: string, description: string, amount: string) => {
    return new Promise(async (resolve, reject) => {
        try {    

            const contractFeatureModel = mongoose.model(CONTRACT_FEATURE_COLLECTION, contractFeatureSchema);

            // name existing validation
            let isContractFeatureExist = await contractFeatureModel.findOne({ name, type });

            if (isContractFeatureExist) return reject({ status: false, message: "Sorry, feature with this name already exists!" });

            // create new feature
            amount = amount.toString()
            const createdContractFeature = new contractFeatureModel({
                name,
                type,
                description,
                amount
            });

            createdContractFeature.save()
                .then((payload) => {
                    resolve({ status: true, data: payload, message: 'Contract Feature Added Successfully' })
                })
                .catch((err) => {
                    reject({ status: false, message: "Something went wrong on saving" })
                });

        } catch (err) {
            reject({ status: false, message: "Something went wrong" });
        }
    })
};

export default addContractFeature;