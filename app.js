var express = require("express");
var app = express();
var path = require("path");

function translateTime (value){
	return {
		unix: Date.parse(value)/1000,
		natural: value
	}
}

function unixOnly(value){
	let allMonths = ["January", "February", "March", "April", 
					"May", "June", "July", "August", 
					"September", "October", "November", "December"];

	let dateString = new Date (value * 1000);
	let day = dateString.getDate();
	let month = dateString.getMonth();
	let year = dateString.getFullYear();
	let givenDate = allMonths[month] + " " + day + ", " + year
	
	return {
		unix: Number(value),
		natural: givenDate
	}
}

// define static file paths
app.use( express.static( __dirname + "/View" ) );

/* 
 * For example: To include JS
 * app.use ( express.static( __dirname + "/Scripts" ) );
 */

// Home Page
app.get("/", function (req, res){
    res.sendFile("index.html");
});

// Specific parameters
app.get("/:who", function (req, res){
	let query = req.params.who;
	let result = isNaN(query) ? translateTime(query) : unixOnly(query);
	
	// gibberish urls; mostly strings that are not Dates
	if (result.unix != result.unix){
		result = {
				unix: null,
				natural: null
			};
	}

	res.writeHead(200, {"Content-Type": "text/plain"});
	res.end(JSON.stringify(result));
});



/* 
 * create server and then listen on port
 * Instead of "http.createServer(app).listen(1337);"
 */
app.listen(1337);
console.log("Server running at http://localhost:1337/");