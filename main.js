const API_KEY = "1f0725e7c794fb26f01e2d602de3c624";
const api_url = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const user_input = document.getElementById("user_input");
const inp_location = document.getElementById("inp_location");
const description = document.getElementById("description");
const weather = document.getElementById("weather");
const humid = document.getElementById("humid");
const temp = document.getElementById("temp");
const wind = document.getElementById("wind");
const imageCon = document.getElementById("img_icon");

const weatherTexts = {
  Clear: "The weather is clear today with bright sunshine and a warm breeze. It’s a perfect day to be outside.",
  Clouds: "It’s a cloudy day with gray skies stretching across the horizon. The air feels calm and cool.",
  Rain: "It’s rainy today with steady showers and wet streets. The cool air brings a fresh, peaceful feeling.",
  Drizzle: "Light drizzle falls through the air, making everything slightly damp. The soft rain feels gentle and refreshing.",
  Thunderstorm: "A thunderstorm rumbles through the sky with flashes of lightning and heavy rain. It’s best to stay indoors.",
  Mist: "A thin mist floats through the air, blurring the view and cooling the morning with a soft touch.",
  Smoke: "Smoke hangs in the air, dimming the sunlight and making the sky look hazy and heavy.",
  Haze: "A warm haze covers the sky, softening the sunlight and making the day feel a bit dreamy.",
  Fog: "Thick fog rolls in, covering everything in a soft, white cloud. Visibility is low, and the world feels quiet.",
  Squall: "A sudden squall brings strong winds and fast-moving rain, making the weather wild and unpredictable."
};

const icons = {
  Clear: ['day.svg', 'night.svg'],
  Clouds: 'cloudy.svg',
  Rain: 'rain.svg',
  Drizzle: 'drizzle.svg',
  Thunderstorm: 'thunderstorms-rain.svg',
  Mist: 'mist.svg',
  Smoke: 'smoke-particles.svg',
  Haze: 'haze.svg',
  Fog: 'fog.svg',
  Squall: 'squall.svg'
};

const setWeather = (data, timeOfDay) => {
   inp_location.textContent = data.name || "Unknown location";
   weather.textContent = data.weather[0].main || "Unknown";
   humid.textContent = data.main.humidity || "0";
   temp.textContent = data.main.temp || "00";
   wind.textContent = data.wind.speed || "0.00";
   description.textContent = weatherTexts[data.weather[0].main] || "Weather information unavailable.";
   
   const iconKey = data.weather[0].main;
   const iconFile = Array.isArray(icons[iconKey])
      ? icons[iconKey][timeOfDay === "day" ? 0 : 1]
      : icons[iconKey];
   imageCon.setAttribute("src", `./images/${iconFile}`);
};

const getWeatherApi = async () => {
   const response = await fetch(`${api_url}&q=${user_input.value},Philippines&appid=${API_KEY}`);
   const data = await response.json();

   if (!data.sys || data.sys.country !== "PH") {
      //setWeather({ name: "Location not found" });
      inp_location.textContent = "Unknown location";
      weather.textContent = "Unknown";
      humid.textContent = "0";
      temp.textContent = "00";
      wind.textContent = "0.00";
      description.textContent = "Weather information unavailable.";
      imageCon.setAttribute("src", `./images/def.svg`);
      return;
   }

   const currentHour = new Date().getHours();
   const timeOfDay = currentHour >= 6 && currentHour < 18 ? "day" : "night";
   setWeather(data, timeOfDay);

};

user_input.addEventListener('input', () => user_input.classList.remove('err_inp'));
document.getElementById('search').addEventListener('click', () => {
   if (!user_input.value) {
      user_input.classList.add('err_inp');
      return;
   }
   
   document.querySelector('.main_info').classList.add('ani');
   setTimeout(() => {
      getWeatherApi();
      document.querySelector('.main_info').classList.remove('ani');
      user_input.value = "";
   }, 600);
});






