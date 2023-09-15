import mongoose from "mongoose";
import { ADMIN_COLLECTION } from "../../config/mongoose/collections";
import adminSchema from "../../model/adminSchema";
import bcrypt from 'bcryptjs';

const adminLogin = (username: string, password: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const adminModel = mongoose.model(ADMIN_COLLECTION, adminSchema);

            let adminMatch = await adminModel.findOne({ username: username });

            if (adminMatch) {

                await bcrypt.compare(password, adminMatch.password)
                    .then((status) => {
                        if (!status) return reject({ status: false, message: "Password not matched" });
                        else return resolve({ status: true, message: "User validated", userId: adminMatch._id })
                    })
                    .catch((err) => reject({ status: false, message: "Something went wrong" }));
            }

            else return reject({ status: false, msg: "Email not found" });

        }
        catch (err) {
            reject({ status: false, message: "Something went wrong" });
        }
    })
};

export default adminLogin;