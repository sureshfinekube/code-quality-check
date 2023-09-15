import mongoose from "mongoose";
import { BASIC_FEE_COLLECTION } from "../../config/mongoose/collections";
import basicFeeSchema from "../../model/contractFeatureSchema";

const getBasicFee = () => {
    return new Promise<ReturnBasicFee>(async (resolve, reject) => {
        try {

            const basicFeeModel = mongoose.model(BASIC_FEE_COLLECTION, basicFeeSchema);

            let basicFee = await basicFeeModel.findOne()

            resolve({ status: true, data: {basicFee}, message: 'Basic fee fetched successfully'})

        } catch (err) {
            reject({ status: false, message: "Something went wrong" });
        }
    })
};

interface ReturnBasicFee {
    status: boolean;
    data: dataObj;
    message: string;
}

type dataObj = {
    basicFee: Object
}

export default getBasicFee;