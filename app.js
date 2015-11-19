console.log("\nWelcome to Node Weather!");
console.log("Please enter your 5 digit zipcode:");

//Setup the console interface
var readline = require('readline');
var r1 = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var zipcode;

//Listen for user input through the console until a valid 5 digit zipcode is provided.
r1.on('line', function(userInput) {
	if ( userInput.match(/^\d{5}$/) ) {
		zipcode = userInput;
		console.log("Zipcode successfully received! You entered " + userInput);
		r1.close();
	}
	else {
		console.log("Input invalid. Please enter a 5 digit zipcode:");
	}
});



/*
3. Create an HTTP or HTTPS request to our selected weather API. View their API docs to see how the request should be formatted (i.e. how we pass in the zipcode as an argument).

4. Create error handling functions depending on various types of errors (user input, connection, status code, any other potential error cases depending on API too)

5. Add stream of data event chunk objects to a body variable.

6. Once the streams are completed ('end' event triggered), parse the body variable accordingly (JSON, plaintext?).

7. Get relevant information from parsed body variable (CURRENT DAY - current temp, hi temp, low temp, chance of rain)
	a. Once the basics here are working, include other info such as 5 day forecasts, hourly forecasts, etc.

8. Log the relevant weather info to the console for user viewing.

9. Clean up file by refactoring and moving relevant components into separate files which we can require in our main app.js file (also include module.exports.functionName)
*/