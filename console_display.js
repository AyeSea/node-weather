function printWeatherNow (weatherInfo) {
	//parse weatherInfo JSON object and log out current temp and weather
	var currentObservation = weatherInfo.current_observation;
	var currentTemp = currentObservation.temp_f;
	var locationName = currentObservation.display_location.full;
	var currentWeather = currentObservation.weather;

	console.log("\nCurrently in " + locationName + ":\n")
	console.log("Temp: " + currentTemp + "\xB0" + "F");
	console.log("Weather: " + currentWeather);	
}

function printForecast (weatherInfo) {
	//parse weatherInfo JSON object for weather info for the next cnt # of days (temp.day, weather.description)
	var days = weatherInfo.forecast.simpleforecast.forecastday;

	console.log("\n\nYour Weather Forecast:\n");

	for (var i = 0; i < days.length; i++) {
		var day = days[i];
		var date = formatDate(day.date.epoch);
		var temp_hi = day.high.fahrenheit;
		var temp_low = day.low.fahrenheit;
		var weather = day.conditions;

		console.log(date + ":");
		console.log("High Temp: " + temp_hi + "\xB0" + "F");
		console.log("Low Temp: " + temp_low + "\xB0" + "F");
		console.log("Weather: " + weather + "\n");

	}
}

function formatDate (unix_timestamp) {
	//convert from seconds to milliseconds
	var timestamp = unix_timestamp * 1000;
	var date = new Date(timestamp);

	var month = date.getMonth() + 1;
	var day = date.getDate();
	var year = date.getFullYear();

	return month + "-" + day + "-" + year;
};

function printTime () {
	console.log("#####################")
	console.log("#   HOURLY UPDATE   #")
	console.log("#####################")
	console.log(new Date());
};

module.exports.printWeatherNow = printWeatherNow;
module.exports.printForecast = printForecast;
module.exports.printTime = printTime;