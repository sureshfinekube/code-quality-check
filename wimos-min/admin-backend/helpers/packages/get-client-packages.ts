import mongoose from "mongoose";
import { PACKAGES_COLLECTION } from "../../config/mongoose/collections";
import packageSchema from "../../model/packagesSchema";

const getClientPackages = () => {

    return new Promise<ReturnGetPackages>(async (resolve, reject) => {
        try {
            const packageModel = await mongoose.model(PACKAGES_COLLECTION, packageSchema);

            let packageList = await packageModel.find({ status: true });

            resolve({ status: true, packageList });
        }
        catch (err) {
            reject({ status: false, packageList: [], message: "something went wrong" });
        }
    })



};

interface ReturnGetPackages {
    status: boolean;
    packageList: object[];
}

export default getClientPackages;