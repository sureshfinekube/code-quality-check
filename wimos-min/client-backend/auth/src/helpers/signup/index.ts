import { BadRequestError } from "@finekube/nft-client-common";
import { Client } from "../../models/client";
import { VerificationClient } from "../../models/verification-client";
import { SignupInputs } from "./abstract";
import { ClientDataModel } from "./client-model-interface";
import { FreePackage } from "../../services/get-free-package";

export class Signup extends SignupInputs {
    protected username = "";
    protected name = "";
    protected email = "";
    protected password = "";
    protected phone_number = "";
    protected phone_code = "";
    protected nationality = "";
    protected address = "";
    protected isFreePackageClient = false;
    protected createdAt = new Date();
    protected updatedAt = new Date();

    constructor(clientData: ClientDataModel) {
        super();
        this.username = clientData.username;
        this.name = clientData.name;
        this.email = clientData.email;
        this.password = clientData.password;
        this.phone_number = clientData.phone_number;
        this.phone_code = clientData.phone_code;
        this.nationality = clientData.nationality;
        this.address = clientData.address;
        this.isFreePackageClient = clientData.isFreePackageClient;
    }


    saveClient() {

        return new Promise(async (resolve, reject) => {

            VerificationClient.updateOne({
                "client_data.email": this.email
            }, {
                $set: { verified: true }
            }).then(async () => {


                const existingClient = await Client.findOne(
                    {
                        $or: [
                            { email: this.email },
                            { username: this.username }
                            // {
                            //     phone_number: this.phone_number,
                            //     nationality: this.nationality
                            // }
                        ]
                    }
                );


                // Throwing corresponding errors
                if (existingClient) {
                    if (existingClient.email === this.email) reject({ err: 'Already registered a account with this email', data: existingClient });
                    if (existingClient.username === this.username) reject({ err: 'Already regisetered a account with this username', data: existingClient });
                    // if (
                    //     existingClient.phone_number === this.phone_number
                    //     &&
                    //     existingClient.phone_code === this.phone_code
                    // ) reject({ err: 'Already registered a account with this phone number', data: existingClient })
                }

                const client = Client.build({
                    name: this.name,
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    phone_number: this.phone_number,
                    phone_code: this.phone_code,
                    nationality: this.nationality,
                    address: this.address,
                    isFreePackageClient: this.isFreePackageClient,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                
                //Saving to db
                let savedClientData = await client.save();

                // adding free package starting and ending date (if free available)
                if (this.isFreePackageClient === true) {
    
                    let startingDate = new Date()
                    let endingDate = new Date()

                    let freePackage = await FreePackage.fetch()

                    if (freePackage.status) {
                        if (freePackage?.freePackageData?.type == 'yearly_subscription') {
                            endingDate.setDate(endingDate.getDate() + 365);
                        } else if (freePackage?.freePackageData?.type == 'monthly_subscription') {
                            endingDate.setDate(endingDate.getDate() + 30);
                        } else {
                            endingDate.setDate(endingDate.getDate() + 365);
                        }
                    } else {
                        endingDate.setDate(endingDate.getDate() + 365);
                    }
    
                    await Client.updateOne({ _id: savedClientData._id }, {
                        freePackageStartingDate: startingDate,
                        freePackageEndingDate: endingDate
                    })
                }
                
                resolve(client);
            }).catch(() => {
                reject({ err: 'Something went wrong' })
            })
            
        })


    };

}





