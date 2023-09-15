import mongoose from "mongoose";
import { DOMAIN_COLLECTION } from "../../config/mongoose/collections";
import domainSchema from "../../model/domainSchema";


const getDomain = () => {
    return new Promise<ReturnGetDomain>(async (resolve, reject) => {
        try {
            const domainModel = mongoose.model(DOMAIN_COLLECTION, domainSchema);
            const domainFound = await domainModel.find({});
            resolve({ domain: domainFound });
        }
        catch (err) {
            reject({ status: false, message: "something went wrong" });
        }
    })
};

interface ReturnGetDomain {
    domain: Array<any>
}



export default getDomain;