import mongoose from "mongoose";
import { CONTRACT_FEATURE_COLLECTION } from "../../config/mongoose/collections";
import contractFeatureSchema from "../../model/contractFeatureSchema";

const verifyFeaturesIds = (featureIds: Array<any>) => {
    return new Promise<ReturnGetFeatures>(async (resolve, reject) => {
        try {

            const contractFeatureModel = mongoose.model(CONTRACT_FEATURE_COLLECTION, contractFeatureSchema);

            let contractFeatures = await contractFeatureModel.find({_id: {$in: featureIds}})

            if (!contractFeatures.length) {
                reject({ status: false, message: 'All Ids not matched'})
            }

            if (contractFeatures.length !== featureIds.length) {
                reject({ status: false, message: 'Some Ids are not matched'})
            }

            // success response
            resolve({ status: true, data: {contractFeatures}, message: 'Contract features fetched successfully'})

        } catch (err) {
            console.log('catch err',err)
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

export default verifyFeaturesIds;