const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config("./.env");
const cors = require("cors");
const { createSocketConnection } = require("./utils/socket.connection");
const { getUserData } = require("./utils/users.utils");
const { markProblemAsSolved } = require("./utils/problems.utils");
//express app
const app = express();

//cors
app.use(
  cors({
    origin: "*",
  })
);
// middleware & static files
app.use(express.static("public"));
app.use(express.json());

// // middleware
// app.use((req, res, next) => {
// 	// console.log(req.path, req.method);

// 	next();
// });

// routes
app.get("/", function (req, res) {
  res.send("hi");
  // res.sendFile(__dirname + "/index.html");
});

app.use("/rooms", require("./routes/rooms"));

app.use("/users", require("./routes/users"));

app.use("/competitions", require("./routes/competitions"));

// listen for requests and connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 4000;
    const server = app.listen(PORT);
    console.log("db connected");

    const io = createSocketConnection(server, {
      cors: {
        origin: "*",
      },
    });
    io.on("connection", (socket) => {
      console.log("socket connected for -" + socket.id);

      // socket join room event
      socket.on("join_room", (roomId, userData) => {
        // console.log(roomId);
        socket.join(roomId);
        // console.log(io.sockets.adapter.rooms);
        socket.broadcast.to(roomId).emit("user_join", {
          message: "a new user join the room!",
          userData,
        });
      });

      socket.on("leave_room", (roomId, userData) => {
        socket.leave(roomId);
        let userName = userData.userName;
        socket.broadcast.to(roomId).emit("user_left", {
          message: `${userName} left the room`,
          userData,
        });
      });

      socket.on("problem_solved", async (data) => {
        let { roomId, userId } = data;
        let userData = await getUserData(userId);
        // console.log(io.sockets.adapter.rooms);
        markProblemAsSolved(data, socket, userData, io);
      });
    });
  })
  .catch((err) => console.log(err));

// console.log(process.env.MONGO_URI);
