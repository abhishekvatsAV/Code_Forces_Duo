const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/userModel");
require("dotenv").config("./.env");
//express app
const app = express();

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

app.post('/', async (req, res) => {
	const user = new User(req.body);
	console.log(user);
	try {
		await user.save();
		res.send(user);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
})



// listen for requests and connect to database
mongoose.connect(process.env.MONGO_URI)
	.then(() => {

		const PORT = process.env.PORT || 4000;
		app.listen(PORT, function () {
			console.log(`Server started on port ${PORT}`);
		});
	})
	.catch((err) => console.log(err));
	
console.log(process.env.MONGO_URI);