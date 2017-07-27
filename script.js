if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position){
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    fetch(`https://api.apixu.com/v1/forecast.json?key=4f84dfb360a044b1a52170503170605&q=${ lat },${ long }&days=10`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let dayHighC = function(dayIndex) {
        return Math.round(data.forecast.forecastday[dayIndex].day.maxtemp_c);
      };
      let dayHighF = function(dayIndex) {
        return Math.round(data.forecast.forecastday[dayIndex].day.maxtemp_f);
      };
      let dayLowC = function(dayIndex) {
        return Math.round(data.forecast.forecastday[dayIndex].day.mintemp_c);
      };
      let dayLowF = function(dayIndex) {
        return Math.round(data.forecast.forecastday[dayIndex].day.mintemp_f);
      };

      let fillForecast = function(hi, lo, unit) {
        let day;
        let dayAsNumber = new Date().getDay();
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

      let city = data.location.name;
      let region = data.location.region;
      let country = data.location.country;
      let tempC = Math.round(data.current.temp_c);
      let tempF = Math.round(data.current.temp_f);
      let day = data.current.is_day;
      let cond = data.current.condition.text;
      let condID = data.current.condition.code;
      let windMPH = Math.round(data.current.wind_mph);
      let windKPH = Math.round(data.current.wind_kph);
      let windDir = data.current.wind_dir;

      let html = document.querySelector('html');
      let location = document.querySelector('#location');
      let temp = document.querySelector('#temp');
      let conditionID = document.querySelector('#cond');
      let wind = document.querySelector('#wind');
      let imperialBtn = document.querySelector('#imperial');
      let metricBtn = document.querySelector('#metric');

      let sunnyDayImage = 'https://static.pexels.com/photos/60696/leaves-blue-sky-summer-bright-day-60696.jpeg';
      let clearNightImage = 'http://clear-night.com/img/clear-night-placeholder.jpg';
      let cloudyDayImage = 'https://images.pexels.com/photos/113/sky-clouds-cloudy-weather.jpg?w=1260&h=750&auto=compress&cs=tinysrgb';
      let cloudyNightImage = 'http://www.walldevil.com/wallpapers/a82/white-black-cloudy-supermoon-wallpaper-desktop.jpg';
      let overcastDayImage = 'http://www.photos-public-domain.com/wp-content/uploads/2012/04/gray-overcast-sky.jpg';
      let overcastNightImage = 'http://th.physik.uni-frankfurt.de/~scherer/Blogging/WavesInTheSky/sky_1.jpg';
      let rainyDayImage = 'https://images.pexels.com/photos/31202/pexels-photo-31202.jpg?w=1260&h=750&auto=compress&cs=tinysrgb';
      let rainyNightImage = 'http://media2.wcpo.com/photo/2016/06/22/WCPO_Rain_rainy_night_1466647920034_40908545_ver1.0_640_480.jpg';
      let snowyDayImage = 'https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb';
      let snowyNightImage = 'https://s-media-cache-ak0.pinimg.com/originals/f6/25/42/f625422d855f97e81fe77070b4c7119f--wallpaper-free-download-winter-night.jpg';
      let severeDayImage = 'http://www.prevention.com/sites/prevention.com/files/images/news/featured_images/thunderstorm-628x363-TS-135165621_0.jpg';
      let severeNightImage = 'http://eskipaper.com/images/lightning-at-night-1.jpg';
      let wallpaper;

      location.textContent = `${ city }, ${ region }, ${ country }`;
      temp.textContent = `${ tempC }&deg;C`;
      conditionID.textContent = `${ cond }`;
      wind.textContent = `Wind speed is ${ windKPH } km/h from ${ windDir }`;

      imperialBtn.addEventListener('click', function() {
        makeImperial();
      });

      metricBtn.addEventListener('click', function() {
        makeMetric();
      });

      function makeImperial() {
        imperialBtn.classList.add('active');
        metricBtn.classList.remove('active');
        temp.innerHTML = `${ tempF }&deg;F`;
        wind.textContent = `Wind speed is ${ windMPH } mi/h from ${ windDir }`;
        fillForecast(dayHighF, dayLowF, 'F');
      };

      function makeMetric() {
        metricBtn.classList.add('active');
        imperialBtn.classList.remove('active');
        temp.innerHTML = `${ tempC }&deg;C`;
        wind.textContent = `Wind speed is ${ windKPH } km/h from ${ windDir }`;
        fillForecast(dayHighC, dayLowC, 'C');
      };

      if(country === 'United States of America') {
        makeImperial();
      };

      switch (true) {
        case condID === 1000 && day === 1:
          wallpaper = sunnyDayImage;
          break;
        case condID === 1000 && day === 0:
          wallpaper = clearNightImage;
          break;
        case condID < 1009 && day === 1:
          wallpaper = cloudyDayImage;
          break;
        case condID < 1009 && day === 0:
          wallpaper = cloudyNightImage
          break;
        case condID === 1009 && day === 1:
          wallpaper = overcastDayImage;
          break;
        case condID === 1009 && day === 0:
          wallpaper = overcastNightImage;
          break;
        case condID < 1100 && day === 1:
          wallpaper = overcastDayImage;
          break;
        case condID < 1100 && day === 0:
          wallpaper = overcastNightImage;
          break;
        case condID < 1150 && day === 1:
          wallpaper = snowyDayImage;
          break;
        case condID < 1150 && day === 0:
          wallpaper = snowyNightImage;
          break;
        case condID < 1210 && day === 1:
          wallpaper = rainyDayImage;
          break;
        case condID < 1210 && day === 0:
          wallpaper = rainyNightImage;
          break;
        case condID < 1226 && day === 1:
          wallpaper = snowyDayImage;
          break;
        case condID < 1226 && day === 0:
          wallpaper = snowyNightImage;
          break;
        case condID < 1255 && day === 1:
          wallpaper = rainyDayImage;
          break;
        case condID < 1255 && day === 0:
          wallpaper = rainyNightImage;
          break;
        case condID < 1261 && day === 1:
          wallpaper = snowyDayImage;
          break;
        case condID < 1261 && day === 0:
          wallpaper = snowyNightImage;
          break;
        case condID < 1273 && day === 1:
          wallpaper = rainyDayImage;
          break;
        case condID < 1273 && day === 0:
          wallpaper = rainyNightImage;
          break;
        case condID < 1279 && day === 1:
          wallpaper = severeDayImage;
          break;
        case condID < 1279 && day === 0:
          wallpaper = severeNightImage;
          break;
        case condID < 1300 && day === 1:
          wallpaper = snowyDayImage;
          break;
        case condID < 1300 && day === 0:
          wallpaper = snowyNightImage;
          break;
      }

      html.style.backgroundImage = `url(${ wallpaper })`;

    });

  });

};
