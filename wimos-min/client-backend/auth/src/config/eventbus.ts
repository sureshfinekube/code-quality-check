import { ClientPackageSubscribedListener } from "../events/listeners/client-package-subscribed-listener";
import { OtpExpirationCompleteListener } from "../events/listeners/otp-expiration-complete-listener";
import { SharedStoreCreateFreePackageListener } from "../events/listeners/shared-store-free-package-listener";
import { SaveAbiBytecodeListener } from "../events/listeners/save-abi-bytecode-listener";
import { natsWrapper } from "../nats-wrapper";

export const connectEventBus = async () => {
    try {
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID!,
            process.env.NATS_CLIENT_ID!,
            process.env.NATS_URL!
        ).then(()=>{
            new OtpExpirationCompleteListener(natsWrapper.client).listen();
            new ClientPackageSubscribedListener(natsWrapper.client).listen();
            new SharedStoreCreateFreePackageListener(natsWrapper.client).listen();
            new SaveAbiBytecodeListener(natsWrapper.client).listen();
        })
    }
    catch (err: any) {
        console.log(err.message);
    }
}