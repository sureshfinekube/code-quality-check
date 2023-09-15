import mongoose from "mongoose";
import { DOMAIN_COLLECTION } from "../../config/mongoose/collections";
import domainSchema from "../../model/domainSchema";

const updateDomain = ({id, domain}) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id || !domain) reject({ status: false, message: "Required params missing" });
      
      const domainModel = mongoose.model(DOMAIN_COLLECTION, domainSchema);
      const domainFound = await domainModel.findOne({ id });

      if (!domainFound) {
        reject({ status: false, message: "Invalid id" });
      }

      let updatedDomain = await domainModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            domain,
          },
        },
        {
            new: true
        }
      );

      resolve({ status: true, data: updatedDomain });

    } catch (err) {
      reject({ status: false, message: "something went wrong" });
    }
  });
};

export default updateDomain;
