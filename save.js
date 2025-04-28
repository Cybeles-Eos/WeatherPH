
let user_input = document.getElementById("user_input");

let inp_location = document.getElementById("inp_location");
let description = document.getElementById("description");

let weather = document.getElementById("weather");
let humid = document.getElementById("humid");
let temp = document.getElementById("temp");
let wind = document.getElementById("wind");
let descrip = document.getElementById("description");
let imageCon = document.getElementById("img_icon");

function defaultVal(loc = "Unknown location", weth = "Unknown", hum = "0", tem = "00", win = "0.00", des = "Weather information unavailable."){
   inp_location.textContent = loc;
   weather.textContent = weth;
   humid.textContent = hum;
   temp.textContent = tem;
   wind.textContent = win;
   descrip.textContent = des; 
}
   
// Get the current time in the Philippines (PHT)
const options = { timeZone: 'Asia/Manila' };
const currentTime = new Date().toLocaleString('en-US', options);
const currentDate = new Date(currentTime);
const currentHour = currentDate.getHours(); // Extract the current hour
let icons = [
   { clearM: 'day.svg', clearN: 'night.svg' },
   'cloudy.svg',
   'rain.svg',
   'drizzle.svg',
   'thunderstorms-rain.svg',
   'mist.svg',
   'smoke-particles.svg',
   'haze.svg',
   'fog.svg',
   'squall.svg',
];



user_input.addEventListener('input', ()=> user_input.classList.remove('err_inp'));
document.getElementById('search').addEventListener('click', ()=>{
   if(user_input.value == ""){
      user_input.classList.add('err_inp');
      return;
   }

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
    
   const API_KEY = "1f0725e7c794fb26f01e2d602de3c624";
   let api_url = "https://api.openweathermap.org/data/2.5/weather?units=metric";
   
   async function getWeatherApi(){
      let api_response = await fetch(api_url + `&q=${user_input.value},Philipines` +`&appid=${API_KEY}`);
      let data = await api_response.json();
      
      if(!data.sys || data.sys.country !== "PH"){
         defaultVal("Location not found.");
         return;
      }


      user_input.value = "";
      document.querySelector('.main_info').classList.add('ani');
      setTimeout(() => {
         defaultVal(
            data.name,
            data.weather[0].main,
            data.main.humidity,
            data.main.temp,
            data.wind.speed,
            weatherTexts[data.weather[0].main] || "Weather information unavailable."
         );
      
         const weatherType = data.weather[0].main;
         let imgSrc = "./images/def.svg"; // Default image
      
         if (weatherType === 'Clear') {
            imgSrc = `./images/${(currentHour >= 6 && currentHour < 18) ? icons[0].clearM : icons[0].clearN}`;
         } else {
            const iconMap = {
               Clouds: icons[1],
               Rain: icons[2],
               Drizzle: icons[3],
               Thunderstorm: icons[4],
               Mist: icons[5],
               Smoke: icons[6],
               Haze: icons[7],
               Fog: icons[8],
               Squall: icons[9]
            };
            if (iconMap[weatherType]) {
               imgSrc = `./images/${iconMap[weatherType]}`;
            }
         }
      
         imageCon.setAttribute("src", imgSrc);
      
         document.querySelector('.main_info').classList.remove('ani');
      }, 300);
      console.log(data);
   }

   getWeatherApi();
});