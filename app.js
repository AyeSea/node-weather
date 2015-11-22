//Require config file containing API key for accessing OpenWeatherMap API
var config = require('./config');

//Declare variables needed to make API request
var request_params = {
	city: "",
	url_base: "http://api.openweathermap.org/data/2.5/",
	url_params: "&units=imperial&appid=",
	api_key: config.api_key
};
var current_weather_url = "weather?q=";
var forecast_url = "forecast/daily?q=";

//Require custom module to make HTTP requests to OpenWeatherMap API
var weather_api = require('./weather_api');

//Require Readline module and setup console interface
var readline = require('readline');
var r1 = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

//Welcome User
console.log("\nWelcome to Node Weather!");
console.log("Please enter your city:\n");

//Listen for user input through the console until a valid input is provided (1 or more non-digit characters)
r1.on('line', function(userInput) {
	if ( userInput.match(/^\D+$/) ) {
		request_params.city = userInput;
		r1.close();
	}
	else {
		console.log("Input invalid. Please enter your city:");
	}
});

//API call is only made after we get a valid input from the user.
r1.on('close', function () {
	weather_api.get(request_params, current_weather_url);
	weather_api.get(request_params, forecast_url);
});