//Require config file containing API key for accessing Wunderground API
var config = require('./config');

//Declare variables needed to make API request
var request_params = {
	url_base: "http://api.wunderground.com/api/",
	api_key: config.api_key,
	url_weather: ["/conditions/q/",
							  "/forecast/q/"],
	state: "",
	city: "",
	file_format: ".json"
};

//Require custom module to make HTTP requests to Wunderground API
var weather_api = require('./weather_api');

//Require Readline module and setup console interface
var readline = require('readline');
var r1 = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var start_time;

//Welcome User
console.log("\nWelcome to Node Weather!");
userPrompt();

//Listen for user input through the console until a valid input is provided (1 or more non-digit characters)
//userInput is updated each time the interface's input stream (in this case process.stdin) receives a \n (Enter)
r1.on('line', function(userInput) {
	//split up user input using comma as delimiter
	var userInput = userInput.split(", ");
	var city = userInput[0];
	var state = userInput[1] || "0";

	if ( city.match(/^\D+$/) && (state.match(/^\D{2}$/)) ) {
		request_params.city = city;
		request_params.state = state + "/";
		start_time = new Date().getTime();
		r1.close();
	}
	else {
		console.log("\nInput invalid.");
		userPrompt();
	}
});

//API call is only made after we get a valid input from the user.
r1.on('close', function () {
	getAllWeather();
	//after initial API call, a call is sent every hour for updated weather info
	setInterval(function () {
		var current_time = new Date().getTime();
		var elapsed_time = current_time - start_time;

		if (elapsed_time >= (60 * 60 * 1000)) {
			start = current_time;
			getAllWeather();
		} 
	}, 5 * 60 * 1000);
});

function getAllWeather () {
	//2nd param is request flag and specifies the index for url_weather (conditions i.e. current weather, or forecast)
	weather_api.getForecast(request_params, 0);
};

function userPrompt () {
console.log("Please enter your CITY and STATE, separated by a comma:");
console.log("Ex. New York, NY");
}