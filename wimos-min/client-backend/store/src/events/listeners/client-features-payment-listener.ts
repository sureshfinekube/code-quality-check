import { Listener, Subjects, ClientFeaturesPaymentEvent } from "@finekube/nft-client-common";
import { Message } from "node-nats-streaming";
import { Store } from "../../models/store";
import { queueGroupName } from "./queue-group-name";

export class ClientPackageSubscribedListener extends Listener<ClientFeaturesPaymentEvent>{
    queueGroupName = queueGroupName;
    subject: Subjects.ClientFeaturesPayment = Subjects.ClientFeaturesPayment;
    async onMessage(data: ClientFeaturesPaymentEvent['data'], msg: Message) {

        const store = await Store.findOne({ _id: data.storeId });

        if (store) {
            await Store.updateOne({ _id: data.storeId }, {
                first_time_payment_status: true,
                first_time_payment_id: data.paymentId,
                first_time_session_id: data.sessionId,
                first_time_payment_order_id: data.orderId
            });
        }

        msg.ack();
    }
}