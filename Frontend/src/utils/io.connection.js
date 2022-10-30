
import { io } from "socket.io-client"
let socket;
const connectToSocket = () => {
    socket = io("http://localhost:4000");
    socket.on("connect",() => {
        console.log("connected");
    })
}

export const getSocket = () => {
    return socket;
}

export default connectToSocket;