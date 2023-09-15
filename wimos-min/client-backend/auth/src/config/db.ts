import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI!,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true

            } as ConnectOptions
        );

        console.log(`Auth-db connected: ${conn.connection.host}`);

    }
    catch (err: any) {
        console.log(err.message);
        process.exit(1);
    }
};


export { connectDB }