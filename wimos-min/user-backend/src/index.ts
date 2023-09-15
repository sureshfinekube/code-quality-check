import { connectDB } from "../config/db";
import { app } from "./app";
import "@sentry/tracing";
import { Server } from "socket.io";

let io: any = ''

const start = async () => {
    // Checking the env variables are there
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }

    try {
        await connectDB();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    };

    const server = require('http').createServer(app)
    io = new Server(server, {
        cors: {
          origin: "*"
        }
    });

    io.on("connection", (socket: any) => {
        // ...
        // console.log('aydi',socket.id)
        // console.count('user connected')
        socket.on('join', function (data: any) {
            console.log("creating room with store id",data)
            socket.join(data?.sId); // We are using room of socket io
        });

        // NFT purchase notification
        socket.on('buy', (buyData: any) => {
            // console.log('got data from client after buy success',buyData?.notificationData)
            // io.emit('getBuyNotification',buyData)
            // console.log('roooooms::_',io?.sockets?.adapter?.rooms)
            io.sockets.in(buyData?.notificationData?.userId).emit('getBuyNotification', buyData);
        })

        // NFT like notification
        socket.on('like', (likeData: any) => {
            // console.log('got data from client after like success',likeData?.notificationData)
            // io.emit('getBuyNotification',buyData)
            // console.log('roooooms::_',io?.sockets?.adapter?.rooms)
            io.sockets.in(likeData?.notificationData?.userId).emit('getLikeNotification', likeData);
        })

        // User follow notification
        socket.on('follow', (followData: any) => {
            // console.log('got data from client after follow success',followData?.notificationData)
            // io.emit('getBuyNotification',buyData)
            // console.log('roooooms::_',io?.sockets?.adapter?.rooms)
            io.sockets.in(followData?.notificationData?.userId).emit('getFollowNotification', followData);
        })

        // socket.emit('notificationFC', {msg: 'messii'})
        // io.emit('sendNotify', {msg: 'messii'})
    });

    server.listen(process.env.PORT || 8080, () => {
        console.log(`Server started on port ${process.env.PORT || 8080}`);
    });

};


start();

export {io}