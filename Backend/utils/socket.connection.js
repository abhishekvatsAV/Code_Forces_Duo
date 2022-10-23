const { Server } = require("socket.io");
let ioConn;
module.exports = {
    createSocketConnection : (server,corsConfig) => {
        try {
            const io = new Server(server,{
                cors:corsConfig
            });
            ioConn = io;
            return io;
        } catch (error) {
            return "";
        }
    },
    getSocket : () => {
        try {
            if(!ioConn){
                throw new Error("socket not connected");
            }
            return ioConn;
        } catch (error) {
            console.log(error);
        }
    }
}