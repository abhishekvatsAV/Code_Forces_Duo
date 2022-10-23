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
app.use(cors({
	origin: "*"
}));
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

// listen for requests and connect to database
mongoose.connect(process.env.MONGO_URI)
	.then(() => {
		const PORT = process.env.PORT || 4000;
		const server = app.listen(PORT);
		const io = createSocketConnection(server, {
			cors: {
				origin: "*"
			}
		})
		io.on("connection",(socket) => {
			console.log("socket connected for -" + socket.id);

			// socket join room event
			socket.on("join_room",(roomId,userName) => {
				socket.join(roomId);
				socket.to(roomId).broadcast({
					message:"a new user join the room!",
					userName	
				})
			});

			socket.on("leave_room",(roomId,userName) => {
				socket.leave(roomId);
				socket.to(roomId).broadcast({
					message:`${userName} left the room`,
					userName	
				})
			});

			socket.on("problem_solved",async (data) => {
				let { roomId,userId } = data;
				let userData = await getUserData(userId);
				markProblemAsSolved(data);
				socket.to(roomId).broadcast({
					message:`${userData.userName} solved a problem!`,
					userName:userData.userName	
				})
			})
		})
	})
	.catch((err) => console.log(err));

// console.log(process.env.MONGO_URI);