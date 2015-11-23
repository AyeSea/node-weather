var http = require('http');

//Require custom module to display weather info as console output
var console_display = require('./console_display');

function getForecast (request_params, request_flag) {
	//Setup HTTP request to OpenWeatherMap's API.
	var request_params = request_params;
	var url = "";

	//loop through request_params to fill out url
	for (var key in request_params) {
		var value = request_params[key]

		if (Array.isArray(value)) {
			url += value[request_flag];
		} 
		else {
			url += value;
		}
	}

	var request = http.get(url, function(response) {
		var body = "";

		response.on('data', function(chunk) {
			body += chunk;
		});

		response.on('end', function() {
			if (response.statusCode === 200) {
				var weatherInfo = JSON.parse(body);
				
				if (request_flag === 0) {
					console_display.printTime();
					console_display.printWeatherNow(weatherInfo);

					//request for forecast will only be made once request for current weather completes
					request.on('close', function() {
						getForecast(request_params, 1);		
					});
				}
				else if (request_flag === 1) {
					console_display.printForecast(weatherInfo);
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

module.exports.getForecast = getForecast;