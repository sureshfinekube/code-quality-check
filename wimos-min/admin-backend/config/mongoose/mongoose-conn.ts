import mongoose from 'mongoose';

const mongoConnect = () => {
    try {
        //Connecting To MongoDB
        let mongoUri = ''
        if (process.env.ENV === 'DEV') {
            mongoUri = process.env.DEV_MONGO_PUBLIC_URL
        } else {
            mongoUri = process.env.MONGO_PUBLIC_URL
        }
        mongoose
            .connect(`${mongoUri}`)
            .then(
                () => {
                    console.log("Database connected");
                },
                (err) => {
                    console.log("Database connection failed");
                }
            )
            .catch((err) => {
                console.log("Database not connected. Something went wrong");
            });

    } catch (err) {
        console.log("Database not connected. Something went wrong");
    }
}



export default mongoConnect;
