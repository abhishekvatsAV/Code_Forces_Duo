const express = require("express");

//express app
const app = express();

// middleware & static files
app.use(express.static("public"));

// middleware
app.use((req, res, next) => {
	// console.log(req.path, req.method);

	next();
});

// routes
app.get("/", function (req, res) {
	res.send("hi");
	// res.sendFile(__dirname + "/index.html");
});



// listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
	console.log(`Server started on port PORT`);
});