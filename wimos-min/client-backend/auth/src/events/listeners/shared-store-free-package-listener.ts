import {
  Listener,
  Subjects,
  sharedStoreCreateEvent,
} from "@finekube/nft-client-common";
import { Message } from "node-nats-streaming";
import { Client } from "../../models/client";
import { queueGroupName } from "./queue-group-name";

export class SharedStoreCreateFreePackageListener extends Listener<sharedStoreCreateEvent> {
  queueGroupName = queueGroupName;
  subject: Subjects.SharedStoreCreated = Subjects.SharedStoreCreated;
  async onMessage(data: sharedStoreCreateEvent["data"], msg: Message) {
    const client = await Client.findOne({ _id: data.clientId });

    if (client) {
      await Client.updateOne(
        { _id: data.clientId },
        {
          $set: {
            packageId: data.packageId,
            isFreePackageClient: true,
          },
        }
      );
    }

    msg.ack();
  }
}
