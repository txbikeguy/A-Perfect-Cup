$(document).ready(function(event) {

// get location button functionality
$(window).on("load", function(event){
	event.preventDefault();
	$("#location-lat-long").val("Finding location. Please wait...");
	// check if browser supports the geolocation api
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(success);			// if geolocation supported, call function
	} else {
		$("#location-lat-long").val('Your browser doesn\'t support the geolocation api.');
	}

});

// function to get lat/long and plot on a google map
function success(position) {
	var latitude		= position.coords.latitude;							// set latitude variable
	var longitude		= position.coords.longitude;						// set longitude variable
	
	getWeather(latitude,longitude);											// get weather for the lat/long
}

		
// function to get weather for an address
function getWeather(latitude,longitude) {
	if(latitude != '' && longitude != '') {
		$.getJSON( "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units=imperial&APPID=43ae0f269ab5e7d4ac4efa288be62552", function(data) {	// add '&units=imperial' to get U.S. measurements
			var currWeather					= new Array();								// create array to hold our weather response data
			currWeather['currTemp']			= Math.round(data.main.temp);				// current temperature
			currWeather['highTemp']			= Math.round(data.main.temp_max);			// today's high temp
			currWeather['lowTemp']			= Math.round(data.main.temp_min);			// today's low temp
			currWeather['sunrise']			= data.sys.sunrise;
			currWeather['sunset']			= data.sys.sunset;
			
			currWeather['description']		= data.weather[0].description;				// short text description (ie. rain, sunny, etc.)
			currWeather['icon']				= "https://openweathermap.org/img/w/"+data.weather[0].icon+".png";	// 50x50 pixel png icon
			currWeather['windSpeed']		= Math.round(data.wind.speed);				// wind speed
			
			
			currWeather['description']		= data.weather[0].description;				// short text description (ie. rain, sunny, etc.)
			currWeather['icon']				= "http://openweathermap.org/img/w/"+data.weather[0].icon+".png";	// 50x50 pixel png icon
			currWeather['windSpeed']		= Math.round(data.wind.speed);				// wind speed
			
			currWeather['windDegree']		= data.wind.deg;							// wind direction (in degrees)
			currWeather['windCompass']		= Math.round((currWeather['windDegree'] -11.25) / 22.5);	// wind direction (compass value)
			
			// array of direction (compass) names
			var windNames					= new Array("North","North Northeast","Northeast","East Northeast","East","East Southeast", "Southeast", "South Southeast","South","South Southwest","Southwest","West Southwest","West","West Northwest","Northwest","North Northwest");

			currWeather['windDirection']	= windNames[currWeather['windCompass']];	// convert degrees and find wind direction name
			
			
			var response 		= "It is currently "+currWeather['currTemp']+"\xB0 and "+currWeather['description'];
			
			if(currWeather['windSpeed']>0) {											// if there's wind, add a wind description to the response
				response		= response + " with winds" + " at " +currWeather['windSpeed'];
				if(currWeather['windSpeed']==1) {
					response		+= " mile per hour";
				} else {
					response		+= " miles per hour";
				}
			}
			var response2 = "<span class='highTemperature'>The high for today is " + currWeather['highTemp'] + "\xB0" + '</span>'; 
			var response2 = "<span class='highTemperature'>The high for today is " + currWeather['highTemp'] + "\xB0 and the low tonight will be " + currWeather['lowTemp'] + "\xB0"; 
			var response3 = "<img src='" + currWeather['icon'] + "'>";

			
			$("#weather").html(response);									// write current weather to textarea
			$("#weather").append(response2);
			$("#icon").append(response3);
			$("#location-lat-long").html("<strong>" + data.name + "</strong><span class='latLong'>Latitude: " + data.coord.lat + " / Longitude: " + data.coord.lon + "</span>")

			var sunrise = moment.unix(currWeather['sunrise']).format('h:mm A');
			var sunset = moment.unix(currWeather['sunset']).format('h:mm A');

			var response4 = "<span class='sunUp'><i class='fa fa-sun-o' aria-hidden='true'></i> Sunrise Today: " + sunrise + '</span>';
			var response5 = "<span class='sunDown'><i class='fa fa-moon-o' aria-hidden='true'></i> Sunset Today: " + sunset + '</span>';

			$("#weather").append(response4);
			$("#weather").append(response5);

			//console.log(data);												// log weather data for reference (json format) 
			$("#location-lat-long").html("<strong>" + data.name + "</strong><span class='latLong'>Latitude: " + data.coord.lat + " / Longitude: " + data.coord.lon + "</span>")
		});
	} else {
		return false;														// respond w/error if no address entered
	}
}

});
