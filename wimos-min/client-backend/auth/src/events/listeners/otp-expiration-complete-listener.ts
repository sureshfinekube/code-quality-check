import { Listener, Subjects, OtpExpirationCompleteEvent } from "@finekube/nft-client-common";
import { Message } from "node-nats-streaming";
import { VerificationClient } from "../../models/verification-client";
import { queueGroupName } from "./queue-group-name";


export class OtpExpirationCompleteListener extends Listener<OtpExpirationCompleteEvent>{
    queueGroupName = queueGroupName;
    subject: Subjects.OtpExpirationComplete = Subjects.OtpExpirationComplete;
    async onMessage(data: OtpExpirationCompleteEvent['data'], msg: Message) {

        const doc = await VerificationClient.findById(data.id);

        if (doc){
            await VerificationClient.deleteOne({ _id: data.id })
            .then(() => {
                console.log("Verification Document removed");
            })
            .catch((err) => {
            });

        }

        msg.ack();
    }
}