import { ClientRegisteredListener } from "../events/listeners/client-registered-listener";
import { natsWrapper } from "../nats-wrapper";

export const connectEventBus = async () => {
    try {

        // nats wrapper connection
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID!,
            process.env.NATS_CLIENT_ID!,
            process.env.NATS_URL!
        );

        new ClientRegisteredListener(natsWrapper.client).listen();
    }
    catch (err: any) {
        console.log(err.message);
    }
}