import { Server } from "socket.io";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.SOCKET_PORT || 4000;

const io = new Server({
    cors: {
        origin: "https://estate-edge-gilt.vercel.app"
        // origin: "http://localhost:5173"
    },
});

// io.on("connection", (socket) => {
//     socket.on("test", (data) => {
//         console.log(data)
//     })
// })

let onlineUser = [];

const addUser = (userId, socketId) => {
    const userExits = onlineUser.find((user) => user.userId === userId);
    if (!userExits) {
        onlineUser.push({ userId, socketId });
    }
};

const removeUser = (socketId) => {
    onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    socket.on("newUser", (userId) => {
        addUser(userId, socket.id);
        console.log(onlineUser)
    });

    socket.on("sendMessage", ({ receiverId, data }) => {
        console.log("ID-->", receiverId, data)
        const receiver = getUser(receiverId);
        io.to(receiver.socketId).emit("getMessage", data);
    });

    socket.on("disconnect", () => {
        removeUser(socket.id);
    });
});

io.listen(PORT, () => {
    console.log(`✅ Socket.IO server listening on port ${PORT}`);
});