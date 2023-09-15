import mongoose from "mongoose";
import { ADMIN_COLLECTION } from "../../config/mongoose/collections";
import adminSchema from "../../model/adminSchema";
import bcrypt from 'bcryptjs';

const adminPasswordChange = (id: string, old_password: string, new_password: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const adminModel = await mongoose.model(ADMIN_COLLECTION, adminSchema);

            let adminMatch = await adminModel.findOne({ _id: id });
            
            if (adminMatch) {

                await bcrypt.compare(old_password, adminMatch.password)
                    .then( async (status) => {
                        if (!status) return reject({ status: false, message: "Password not matched" });
                        else
                         adminModel.findOneAndUpdate({_id: id},{$set:{password:await bcrypt.hash(new_password, 10)}}).then( async (status) => {
                            return resolve({ status: true, message: "Password Changed!" })
                          })
                         
                   
                    .catch((err) => reject({ status: false, message: "Something went wrong" }));
            })

           
        }
        else return reject({ status: false, message: "User not found" });
    }
        catch (err) {
            reject({ status: false, message: "Something went wrong" });
        }
    })
};

export default adminPasswordChange;