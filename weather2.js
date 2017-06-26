$(document).ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      $.getJSON('https://api.apixu.com/v1/forecast.json?key=4f84dfb360a044b1a52170503170605&q=' + lat + ',' + long + '&days=10', function(json){
        var dayHighC = function(dayIndex) {
          return Math.floor(json.forecast.forecastday[dayIndex].day.maxtemp_c);
        };
        var dayHighF = function(dayIndex) {
          return Math.floor(json.forecast.forecastday[dayIndex].day.maxtemp_f);
        };
        var dayLowC = function(dayIndex) {
          return Math.floor(json.forecast.forecastday[dayIndex].day.mintemp_c);
        };
        var dayLowF = function(dayIndex) {
          return Math.floor(json.forecast.forecastday[dayIndex].day.mintemp_f);
        };

        var fillForecast = function(hi, lo, unit) {
          var day;
          var dayAsNumber = new Date().getDay();
          for (i=0; i<10; i++) {
            if (dayAsNumber === 7) {
              dayAsNumber = 0;
            };
            switch (dayAsNumber) {
              case 0:
                day = 'Sun';
                break;
              case 1:
                day = 'Mon';
                break;
              case 2:
                day = 'Tue';
                break;
              case 3:
                day = 'Wed';
                break;
              case 4:
                day = 'Thu';
                break;
              case 5:
                day = 'Fri';
                break;
              case 6:
                day = 'Sat';
                break;
            };
            dayAsNumber ++;
            dayNthOfType = i+1;
            $('.day-block:nth-of-type(' + dayNthOfType + ')').html('<h3>' + day + '</h3><p class="forecast-temp">' + hi(i) + '/' + lo(i) + '&deg;' + unit + '</p>');
          };
        };

        fillForecast(dayHighC, dayLowC, 'C');

        var city = json.location.name;
        var region = json.location.region;
        var country = json.location.country;
        var tempC = Math.round(json.current.temp_c);
        var tempF = Math.round(json.current.temp_f);
        var day = json.current.is_day;
        var cond = json.current.condition.text;
        var condID = json.current.condition.code;
        var windMPH = Math.round(json.current.wind_mph);
        var windKPH = Math.round(json.current.wind_kph);
        var windDir = json.current.wind_dir;
        var sunnyDayImage = 'https://static.pexels.com/photos/60696/leaves-blue-sky-summer-bright-day-60696.jpeg';
        var clearNightImage = 'https://images.pexels.com/photos/6546/sky-night-space-trees.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb';
        var cloudyDayImage = 'https://images.pexels.com/photos/113/sky-clouds-cloudy-weather.jpg?w=1260&h=750&auto=compress&cs=tinysrgb';
        var cloudyNightImage = 'http://www.walldevil.com/wallpapers/a82/white-black-cloudy-supermoon-wallpaper-desktop.jpg';
        var overcastDayImage = 'http://www.photos-public-domain.com/wp-content/uploads/2012/04/gray-overcast-sky.jpg';
        var overcastNightImage = 'http://th.physik.uni-frankfurt.de/~scherer/Blogging/WavesInTheSky/sky_1.jpg';
        var rainyDayImage = 'https://images.pexels.com/photos/31202/pexels-photo-31202.jpg?w=1260&h=750&auto=compress&cs=tinysrgb';
        var rainyNightImage = 'http://media2.wcpo.com/photo/2016/06/22/WCPO_Rain_rainy_night_1466647920034_40908545_ver1.0_640_480.jpg';
        var snowyDayImage = 'https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb';
        var snowyNightImage = 'https://s-media-cache-ak0.pinimg.com/originals/f6/25/42/f625422d855f97e81fe77070b4c7119f--wallpaper-free-download-winter-night.jpg';
        var severeDayImage = 'http://www.prevention.com/sites/prevention.com/files/images/news/featured_images/thunderstorm-628x363-TS-135165621_0.jpg';
        var severeNightImage = 'http://eskipaper.com/images/lightning-at-night-1.jpg';

        $('#location').html(city + ', ' + region + ', ' + country);
        $('#temp').html(tempC + '&deg;C');
        $('#cond').html(cond);
        $('#wind').html('Wind speed is ' + windKPH + ' km/h from ' + windDir);

        $('#imperial').on('click', function(){
          $(this).addClass('active');
          $('#metric').removeClass('active');
          $('#temp').html(tempF + '&deg;F');
          $('#kph').removeClass('active');
          $('#wind').html('Wind speed is ' + windMPH + ' mi/h from ' + windDir);
          fillForecast(dayHighF, dayLowF, 'F');
        });

        $('#metric').on('click', function(){
          $(this).addClass('active');
          $('#imperial').removeClass('active');
          $('#temp').html(tempC + '&deg;C');
          $('#mph').removeClass('active');
          $('#wind').html('Wind speed is ' + windKPH + ' km/h from ' + windDir);
          fillForecast(dayHighC, dayLowC, 'C')
        });

        if(country === 'United States of America') {
          $('#imperial').addClass('active');
          $('#metric').removeClass('active');
          $('#temp').html(tempF + '&deg;F');
          $('#kph').removeClass('active');
          $('#wind').html('Wind speed is ' + windMPH + ' mi/h from ' + windDir);
          fillForecast(dayHighF, dayLowF, 'F');
        };

        if(condID === 1000 && day === 1) {
          $('html').css('background-image', 'url(' + sunnyDayImage + ')')
        } else if(condID === 1000 && day === 0) {
          $('html').css('background-image', 'url(' + clearNightImage + ')')
        } else if(condID < 1009 && day === 1) {
          $('html').css('background-image', 'url(' + cloudyDayImage + ')')
        } else if(condID < 1009 && day === 0) {
          $('html').css('background-image', 'url(' + cloudyNightImage + ')')
        } else if(condID === 1009 && day === 1) {
          $('html').css('background-image', 'url(' + overcastDayImage + ')')
        } else if(condID === 1009 && day === 0) {
          $('html').css('background-image', 'url(' + overcastNightImage + ')')
        } else if(condID < 1100 && day === 1) {
          $('html').css('background-image', 'url(' + overcastDayImage + ')')
        } else if(condID < 1100 && day === 0) {
          $('html').css('background-image', 'url(' + overcastNightImage + ')')
        } else if(condID < 1150 && day === 1) {
          $('html').css('background-image', 'url(' + snowyDayImage + ')')
        } else if(condID < 1150 && day === 0) {
          $('html').css('background-image', 'url(' + snowyNightImage + ')')
        } else if(condID < 1210 && day === 1) {
          $('html').css('background-image', 'url(' + rainyDayImage + ')')
        } else if(condID < 1210 && day === 0) {
          $('html').css('background-image', 'url(' + rainyNightImage + ')')
        } else if(condID < 1226 && day === 1) {
          $('html').css('background-image', 'url(' + snowyDayImage + ')')
        } else if(condID < 1226 && day === 0) {
          $('html').css('background-image', 'url(' + snowyNightImage + ')')
        } else if(condID < 1255 && day === 1) {
          $('html').css('background-image', 'url(' + rainyDayImage + ')')
        } else if(condID < 1255 && day === 0) {
          $('html').css('background-image', 'url(' + rainyNightImage + ')')
        } else if(condID < 1261 && day === 1) {
          $('html').css('background-image', 'url(' + snowyDayImage + ')')
        } else if(condID < 1261 && day === 0) {
          $('html').css('background-image', 'url(' + snowyNightImage + ')')
        } else if(condID < 1273 && day === 1) {
          $('html').css('background-image', 'url(' + rainyDayImage + ')')
        } else if(condID < 1273 && day === 0) {
          $('html').css('background-image', 'url(' + rainyNightImage + ')')
        } else if(condID < 1279 && day === 1) {
          $('html').css('background-image', 'url(' + severeDayImage + ')')
        } else if(condID < 1279 && day === 0) {
          $('html').css('background-image', 'url(' + severeNightImage + ')')
        } else if(condID < 1300 && day === 1) {
          $('html').css('background-image', 'url(' + snowyDayImage + ')')
        } else if(condID < 1300 && day === 0) {
          $('html').css('background-image', 'url(' + snowyNightImage + ')')
        }
      });
    });
  };
});
