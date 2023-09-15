import { Listener, Subjects, ClientRegisteredEvent, BadRequestError } from "@finekube/nft-client-common";
import { Message } from "node-nats-streaming";
import { Client } from "../../models/clients";
import { queueGroupName } from "./queue-group-name";

export class ClientRegisteredListener extends Listener<ClientRegisteredEvent>{
    queueGroupName = queueGroupName;
    subject: Subjects.ClientRegistered = Subjects.ClientRegistered;
    async onMessage(data: ClientRegisteredEvent['data'], msg: Message) {

        const client = await Client.findOne({ clientId: data.clientId });

        if (!client) {
            // Build Client
            const BuildClient = Client.build({
                clientId: data.clientId,
                username: data.username,
                email: data.email
            });

            // Save to Db
            await BuildClient.save();
        };

        msg.ack();
    }
}