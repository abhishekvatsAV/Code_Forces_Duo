const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config("./.env");
const cors = require("cors");
//express app
const app = express();

//cors
app.use(cors({
	origin:"*"
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

app.use("/rooms",require("./routes/rooms"));

app.use("/users",require("./routes/users"));

// listen for requests and connect to database
mongoose.connect(process.env.MONGO_URI)
	.then(() => {
		const PORT = process.env.PORT || 4000;
		app.listen(PORT, function () {
			console.log(`Server started on port ${PORT}`);
		});
	})
	.catch((err) => console.log(err));
	
// console.log(process.env.MONGO_URI);







// socket io
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
	cors: { origin: "*" },
});

io.on("connection", (socket) => {
	console.log("a user connected");
	// join room 
	socket.on("joinRoom", (roomId, userId) => {
		socket.join(roomId);
		socket.to(roomId).broadcast.emit("user-connected", userId);
	});

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});

});