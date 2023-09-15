import { PACKAGES_COLLECTION } from "../../config/mongoose/collections";
import mongoose from 'mongoose';
import packageSchema from "../../model/packagesSchema";

const getPackage = (id) => {

    return new Promise<ReturnGetPackages>(async (resolve, reject) => {
        try {
            const packageModel = await mongoose.model(PACKAGES_COLLECTION, packageSchema);

            let findPackage: any = await packageModel.findOne({ _id: id, status: true });

            resolve({ status: true, package: findPackage });
        }
        catch (err) {
            reject({ status: false, message: "something went wrong" });
        }
    })



};

interface ReturnGetPackages {
    status: boolean;
    package: object;
}

export default getPackage;