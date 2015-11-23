//Require config file containing API key for accessing OpenWeatherMap API
var config = require('./config');

//Declare variables needed to make API request
var request_params = {
	url_base: "http://api.wunderground.com/api/",
	api_key: config.api_key,
	url_weather: ["/conditions/q/",
							  "/forecast/q/"],
	city: "",
	file_format: ".json"
};

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
	getAllWeather();
	//after initial API call, a call is sent every hour for updated weather info
	setInterval(getAllWeather, 60 * 1000);
});

function getAllWeather () {
	//2nd param is request flag and specifies the index for url_weather (conditions i.e. current weather, or forecast)
	weather_api.getForecast(request_params, 0);
};