import { Listener, Subjects, ClientPackageSubscribedEvent } from "@finekube/nft-client-common";
import { Message } from "node-nats-streaming";
import { Client } from "../../models/client";
import { queueGroupName } from "./queue-group-name";

export class ClientPackageSubscribedListener extends Listener<ClientPackageSubscribedEvent>{
    queueGroupName = queueGroupName;
    subject: Subjects.ClientPackageSubscribed = Subjects.ClientPackageSubscribed;
    async onMessage(data: ClientPackageSubscribedEvent['data'], msg: Message) {

        const client = await Client.findOne({ _id: data.clientId });

        if (client) {
            await Client.updateOne({ _id: data.clientId }, { packageId: data.packageId, isFreePackageClient: false });
        }

        msg.ack();
    }
}