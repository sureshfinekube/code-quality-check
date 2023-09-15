import mongoose from "mongoose";
import { DOMAIN_COLLECTION } from "../../config/mongoose/collections";
import domainSchema from "../../model/domainSchema";

const addDomain = (domain: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const domainModel = mongoose.model(DOMAIN_COLLECTION, domainSchema);
      const domainFound = await domainModel.findOne({ domain });

      if (domainFound) {
        reject({ status: false, message: "This domain already exists" });
      }

      let domainData = {
        domain
      };

      const domainSave = new domainModel(domainData);

      domainSave
        .save()
        .then((payload: any) => {
          resolve({ status: true, data: payload });
        })
        .catch((err: any) => {
        console.log('eer',err)

          reject({ status: false, msg: "Something went wrong while saving" });
        });

    } catch (err) {
        console.log('eer',err)
      reject({ status: false, message: "something went wrong" });
    }
  });
};

export default addDomain;
