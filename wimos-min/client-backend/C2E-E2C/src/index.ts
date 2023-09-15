import { connectEventBus } from './config/event-bus';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { connectDB } from './config/db';
require('dotenv').config()

const port = 4000;

const start = async () => {

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