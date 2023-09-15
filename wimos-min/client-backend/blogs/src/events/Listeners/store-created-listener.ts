import { Listener, Subjects, createStoreEvent } from '@finekube/nft-client-common';
import { Message } from 'node-nats-streaming';
import { Stores } from '../../models/stores';
import { queueGroupName } from './queue-group-name';

export class StoreCreatedListener extends Listener<createStoreEvent>{
    queueGroupName = queueGroupName;
    subject: Subjects.StoreCreated = Subjects.StoreCreated;
    async onMessage(data: createStoreEvent['data'], msg: Message) {

        const store = await Stores.findOne({ storeId: data.store_data.id, clientId: data.clientId });


        if (!store) {

            const storeBuild = Stores.build({
                storeId: data.store_data.id,
                clientId: data.clientId
            });

            // Save to Db
            await storeBuild.save();
        }


        msg.ack();
    }
}