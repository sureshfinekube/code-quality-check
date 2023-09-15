import mongoose from "mongoose";
import { CONTRACT_FEATURE_COLLECTION } from "../../config/mongoose/collections";
import contractFeatureSchema from "../../model/contractFeatureSchema";

const getContractFeature = () => {
    return new Promise<ReturnGetFeatures>(async (resolve, reject) => {
        try {

            const contractFeatureModel = mongoose.model(CONTRACT_FEATURE_COLLECTION, contractFeatureSchema);

            let contractFeatures = await contractFeatureModel.find()

            resolve({ status: true, data: {contractFeatures}, message: 'Contract features fetched successfully'})

        } catch (err) {
            reject({ status: false, message: "Something went wrong" });
        }
    })
};
interface ReturnGetFeatures {
    status: boolean;
    data: dataObj;
    message: string;
}

type dataObj = {
    contractFeatures: Array<any>
}

export default getContractFeature;