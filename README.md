# node-weather
A simple Node.js console application that displays weather information based on user location. Users provide a city name and receive console output showing current weather details and a forecast for the next 5 days. The app makes API requests to the OpenWeatherMap API, and, if you leave it running, will make a new request every hour from the time you first ran the app.

Instructions:

1) Download the files in this repo to your local machine.

2) Get an OpenWeatherMap API key, which is available for free on their [site](http://openweathermap.org/appid).

3) In the root of the node-weather directory, create a `config.js` file. Copy and paste the code below, replacing YOUR\_API\_KEY with the unique key you received in step 2:

```javascript
var config = {};

config.api_key = "YOUR\_API\_KEY";

module.exports = config;
```

4) Open your terminal/command prompt. Navigate to the node-weather directory and run the app with `node app.js`.