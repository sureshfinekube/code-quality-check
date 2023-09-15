import mongoose, { ConnectOptions } from "mongoose";

const connectDB = async () => {
    try {
        let mongoUri = ''
        if (process.env.ENV == 'DEV') {
            mongoUri = process.env.DEV_MONGO_URI!
        } else {
            mongoUri = process.env.MONGO_URI!
        }
        const conn = await mongoose.connect(mongoUri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true

            } as ConnectOptions
        );

        console.log(`NFT-USER DB connected: ${conn.connection.host}`);

    }
    catch (err: any) {
        console.log(err.message);
        process.exit(1);
    }
};


export { connectDB }