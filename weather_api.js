var http = require('http');

//Require custom module to display weather info as console output
var console_display = require('./console_display');

function getRequest (request_params, requested_data_url) {
	//Setup HTTP request to OpenWeatherMap's API.
	var request_params = request_params;
	var requested_data_url = requested_data_url;

	var request = http.get(request_params.url_base + requested_data_url + request_params.city + request_params.url_params + request_params.api_key, function(response) {
		var body = "";

		response.on('data', function(chunk) {
			body += chunk;
		});

		response.on('end', function() {
			if (response.statusCode === 200) {
				var weatherInfo = JSON.parse(body);

				//if request is for current weather
				if (requested_data_url === "weather?q=") {
					console_display.showCurrentWeather(weatherInfo);
				}
				//else if request is for forecast
        else if (requested_data_url === "forecast/daily?q=") {
        	console_display.showForecast(weatherInfo);
        }
			}
			else {
				console.log("Uh oh! We couldn't get the weather info for " + request_params.city + ": " + http.STATUS_CODES[response.statusCode]);
			}
		});

	});

	request.on('error', function(error) {
		console.log("Uh oh! An error occurred:\n" + error);
	});

};

module.exports.get = getRequest;