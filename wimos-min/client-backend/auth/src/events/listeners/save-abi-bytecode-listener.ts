import {
    Listener,
    Subjects,
    SaveAbiBytecodeEvent,
  } from "@finekube/nft-client-common";
  import { Message } from "node-nats-streaming";
  import { Client } from "../../models/client";
  import { CreateApiContract } from "../../models/contract";
  import { queueGroupName } from "./queue-group-name";
  
  export class SaveAbiBytecodeListener extends Listener<SaveAbiBytecodeEvent> {
    queueGroupName = queueGroupName;
    subject: Subjects.SaveAbiBytecode = Subjects.SaveAbiBytecode;
    async onMessage(data: SaveAbiBytecodeEvent["data"], msg: Message) {
      // checking whether any abis saved for this store
      let isAlreadyCreated = await CreateApiContract.findOne({
        userId: data.clientId,
        storeId: data.storeId,
      });
  
      if (!isAlreadyCreated) {
        // saving the abis
        let savingData = new CreateApiContract({
          userId: data.clientId,
          storeId: data.storeId,
          nftContract: data.erc721,
          marketPlaceContract: data.marketplace,
        });
  
        await savingData.save();
      } else {
        // updating
        await CreateApiContract.updateOne(
          { userId: data.clientId, storeId: data.storeId },
          {
            $set: {
              nftContract: data.erc721,
              marketPlaceContract: data.marketplace,
            },
          }
        );
      }
  
      msg.ack();
    }
  }