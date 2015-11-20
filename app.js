//Require config file containing API key for accessing OpenWeatherMap API
var config = require('./config')

//Require HTTP module and declare variables needed to make API request
var http = require('http');
var url_base = "http://api.openweathermap.org/data/2.5/";
var current_weather_url = "weather?q=";
var forecast_url = "forecast/daily?q=";
var url_params = "&units=imperial&appid=";
var api_key = config.api_key;
var city;

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
		city = userInput;
		r1.close();
	}
	else {
		console.log("Input invalid. Please enter your city:");
	}
});

//API call is only made after we get a valid input from the user.
r1.on('close', function () {

	getRequest(current_weather_url);
	//second argument specifies number of days (including current day) for which we're requesting forecast details
	getRequest(forecast_url, "&cnt=6");

});


function getRequest (requested_data_url, num_days) {
	//Setup HTTP request to OpenWeatherMap's API.
	var requested_data_url = requested_data_url
	var num_days = num_days || "";

	var request = http.get(url_base + requested_data_url + city + num_days + url_params + api_key, function(response) {
		var body = "";

		response.on('data', function(chunk) {
			body += chunk;
		});

		response.on('end', function() {
			if (response.statusCode === 200) {
				var weatherInfo = JSON.parse(body);

				if (requested_data_url === current_weather_url) {
					displayCurrentWeather(weatherInfo);
				}
        else {
        	displayForecast(weatherInfo);
        }
			}
			else {
				console.log("Uh oh! We couldn't get the weather info for " + city + ": " + http.STATUS_CODES[response.statusCode]);
			}
		});

	});

	request.on('error', function(error) {
		console.log("Uh oh! An error occurred:\n" + error);
	});

};


//receives a JSON object containing all weather details for the provided zip code
function displayCurrentWeather (weatherInfo) {
	var currentTemp = weatherInfo.main.temp;
	var locationName = weatherInfo.name;
	var currentWeather = weatherInfo.weather[0].description;

	console.log("\nCurrently in " + locationName + ":\n")
	console.log("Current Temperature: " + currentTemp + "\xB0" + "F");
	console.log("Weather: " + currentWeather);
};

function displayForecast (weatherInfo) {
	//parse weatherInfo JSON object for weather info for the next 6 days (temp.day, weather.description)
	var days = weatherInfo.list;
	days.shift();

	console.log("\n\nForecast for the next " + days.length + " days:\n");

	for (var i = 0; i < days.length; i++) {
		var day = days[i];
		var date = formatDate(day.dt);
		var temp_noon = day.temp.day;
		var weather = day.weather[0].description;


		console.log(date + ":");
		console.log("Temperature: " + temp_noon + "\xB0" + "F");
		console.log("Weather: " + weather + "\n");

	}

};

function formatDate (unix_timestamp) {
	//convert from seconds to milliseconds
	var timestamp = unix_timestamp * 1000;
	var date = new Date(timestamp);

	var month = date.getMonth() + 1;
	var day = date.getDate();
	var year = date.getFullYear();

	return month + "-" + day + "-" + year;
};