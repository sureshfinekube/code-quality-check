import { connectDB } from './config/db';
import { connectEventBus } from './config/eventBus';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { ClientRegisteredListener } from './events/listeners/client-registered-listener';
require('dotenv').config()

const port = 4000;

const start = async () => {

    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID must be defined');
    }
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID must be defined');
    }
    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL must be defined');
    }

    try {
        // Connect DB function
        connectDB();
        // Connect EventBus function
        connectEventBus();

        natsWrapper.client.on('close', () => {
            console.log("NATS connection closed");
            process.exit();
        });

        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());

        
    }
    catch (err: any) {
        console.log(err);
    }


    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
};


start();