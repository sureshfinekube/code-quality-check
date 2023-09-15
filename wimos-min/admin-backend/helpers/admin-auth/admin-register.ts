import mongoose from "mongoose";
import { ADMIN_COLLECTION } from "../../config/mongoose/collections";
import adminSchema from "../../model/adminSchema";
import bcrypt from 'bcryptjs';

const adminRegister = (username: string, password: string) => {
    return new Promise(async (resolve, reject) => {

        try {
            const adminModel = await mongoose.model(ADMIN_COLLECTION, adminSchema);

            let adminExist = await adminModel.findOne({ username: username });

            if (adminExist) return reject({ status: false, msg: "Admin already exist" });

            else {

                //Hashing the password
                password = await bcrypt.hash(password, 10);

                let adminData: AdminData = {
                    username,
                    password
                };

                const admin = new adminModel(adminData);

                //Saving to Database
                admin.save()
                    .then((payload) => {
                        resolve({ status: true, admin: payload });
                    })
                    .catch(() => {
                        reject({ status: false, msg: "Something went wrong while saving" });
                    })
            }
        }
        catch (err) {
        
            reject({ status: false, msg: "Something went wrong" });
        }

    })
};

interface AdminData {
    username: string,
    password: string
};

export default adminRegister;