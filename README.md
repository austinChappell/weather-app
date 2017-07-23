# Project Title

Weather App

## Project Description

This is a weather app using geolocation to find the current weather conditions, as well as the 10 day forecast. Whether is is Imperial or Metric units upon initial load is determined by your location.

### Things to know

This weather app uses a little jQuery to render the data. Initially, the geolocation is found and saved into the variables 'lat' and 'long'.

The API endpoint is called using the data from lat and long in the query string.

Initially, many variables are assigned from the data received. Temp values are rounded to the nearest integer, to avoid a decimal. They are saved to a function that is passed the dayIndex, allowing the forecast to be displayed.

The fillForecast function takes three parameters: hi, lo, and unit. The .getDay method is used to get the day, and a switch case statement is used to assign a string value to 'day' from each numeric value of 'dayAsNumber'.

The fillForecast function is initially invoked with units in Celsius. Many variables are set initially. The image variables (sunnyDayImage, clearNightImage, etc.) are all assigned a particular image reflecting a particular weather condition.

Following the assignment of these image variables, the html is rendered to the page. If the imperial button is clicked, it is given the class 'active,' which highlights it. If metric has the class 'active,' it is removed. The tempearute is then displayed in Fahrenheit instead of Celsius, and the wind is displayed in mph instead of kph. The inverse of this happens if the metric button is clicked.

If the data returns country === 'United States of America,' imperial units will be used. Otherwise, metric units are used, which is the default setting.

The long if/else if statement about condID determines which background image is used. The background image is determined by weather conditions and whether it is day or night.

This code will eventually be refactored to vanilla Javascript instead of jQuery, and possibly written in Node, as this might improve performance. 
