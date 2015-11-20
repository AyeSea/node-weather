//Require config file containing API key for accessing OpenWeatherMap API
var config = require('./config')

console.log("\nWelcome to Node Weather!");
console.log("Please enter your city:");

//Setup the console interface
var readline = require('readline');
var r1 = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var city;

//Listen for user input through the console until a valid input is provided (1 or more letter characters)
r1.on('line', function(userInput) {
	if ( userInput.match(/^[a-zA-Z]+$/) ) {
		city = userInput;
		r1.close();
	}
	else {
		console.log("Input invalid. Please enter your city:");
	}
});

//API call is only made after we get a valid input from the user.
r1.on('close', function () {

	//Setup HTTP request to OpenWeatherMap's API.
	var http = require('http');
	var url_base = "http://api.openweathermap.org/data/2.5/weather?q=";
	var url_params = ",us&units=imperial&appid=";
	//public API key
	var api_key = config.api_key;

	var request = http.get(url_base + city + url_params + api_key, function(response) {
		var body = "";

		response.on('data', function(chunk) {
			body += chunk;
		});

		response.on('end', function() {
			if (response.statusCode === 200) {
				var weatherInfo = JSON.parse(body);
				//send weatherInfo JSON object to the displayInfo function for printing relevant info to the console
				displayInfo(weatherInfo);
			}
			else {
				console.log("Uh oh! We couldn't get the weather info for " + city + ": " + http.STATUS_CODES[response.statusCode]);
			}
		});

	});

	request.on('error', function(error) {
		console.log("Uh oh! An error occurred:\n" + error);
	});

})

//receives a JSON object containing all weather details for the provided zip code
function displayInfo (weatherInfo) {
	//extract the basic weather info we want to display to the user (ex. current temp, location name, current weather)
	var currentTemp = weatherInfo.main.temp;
	var locationName = weatherInfo.name;
	var currentWeather = weatherInfo.weather[0].description;

	console.log("\nDetails for " + locationName + ":\n")
	console.log("Current Temperature: " + currentTemp + "\xB0" + "F");
	console.log("Weather: " + currentWeather);
}