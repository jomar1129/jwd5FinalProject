let weather = {
  apiKey: "05fe4645f412681568fb6efd7002b32c",
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    console.log(name, icon, description, temp);
    let weather = document.getElementById("weather");

    let weatherIcon = ` http://openweathermap.org/img/wn/${icon}.png`;
    let convertedTemp = Math.floor(temp - 273.15);
    let code = `<p class= "text-white fw-bold">${name} <img src = ${weatherIcon}> ${convertedTemp}°C <span class="text-capitalize">  ${description}</span> </p> `;
    weather.innerHTML = code;
  },
};

let geoCode = {
  reverserGeocode: function (latitude, longitude) {
    var api_key = "1615551f09fa43feac472e3fdd3566df";
    // var latitude = "data.coords.lattitude";
    // var longitude = "data.coords.longtitude";

    var api_url = "https://api.opencagedata.com/geocode/v1/json";

    var request_url =
      api_url +
      "?" +
      "key=" +
      api_key +
      "&q=" +
      encodeURIComponent(latitude + "," + longitude) +
      "&pretty=1" +
      "&no_annotations=1";

    // see full list of required and optional parameters:
    // https://opencagedata.com/api#forward

    var request = new XMLHttpRequest();
    request.open("GET", request_url, true);

    request.onload = function () {
      // see full list of possible response codes:
      // https://opencagedata.com/api#codes

      if (request.status === 200) {
        // Success!
        var data = JSON.parse(request.responseText);
        console.log("NAKUHA BA?");
        console.log(data.results[0]); // print the location
        weather.fetchWeather(data.results[0].components.city);
        //weather.fetchWeather("Melbourne");
      } else if (request.status <= 500) {
        // We reached our target server, but it returned an error
        weather.fetchWeather("Sydney");
        console.log("unable to geocode! Response code: " + request.status);
        var data = JSON.parse(request.responseText);
        console.log("error msg: " + data.status.message);
      } else {
        console.log("server error");
      }
    };

    request.onerror = function () {
      // There was a connection error of some sort
      console.log("unable to connect to server");
    };

    request.send(); // make the request
  },

  getLocation: function () {
    function success(data) {
      geoCode.reverserGeocode(data.coords.latitude, data.coords.longitude);
    }
    if (navigator.geolocation) {
      // console.log(navigator.geolocation);
      navigator.geolocation.getCurrentPosition(success, console.error);
    } else {
      weather.fetchWeather("Sydney");
    }
  },
};

geoCode.getLocation();
