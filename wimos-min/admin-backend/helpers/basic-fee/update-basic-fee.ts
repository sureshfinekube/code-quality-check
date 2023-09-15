import mongoose from "mongoose";
import { BASIC_FEE_COLLECTION } from "../../config/mongoose/collections";
import basicFeeSchema from "../../model/contractFeatureSchema";

const updateBasicFee = (data) => {
  return new Promise<ReturnBasicFee>(async (resolve, reject) => {
    try {
      let { amount, isFreePeriod } = data;

      const basicFeeModel = mongoose.model(
        BASIC_FEE_COLLECTION,
        basicFeeSchema
      );

      let basicFee = await basicFeeModel.findOne().sort({ _id: -1 });

      let updatedBasicFee = await basicFeeModel.findOneAndUpdate(
        { _id: basicFee._id },
        {
            $set: {
                amount,
                isFreePeriod,
            }
        },
        { new: true }
      );

      resolve({
        status: true,
        message: "Basic fee updated successfully",
      });
    } catch (err) {
      reject({ status: false, message: "Something went wrong" });
    }
  });
};

interface ReturnBasicFee {
  status: boolean;
  message: string;
}

export default updateBasicFee;
