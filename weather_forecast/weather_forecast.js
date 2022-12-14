require('dotenv').config()
let request = require("request");
const API_KEY = process.env.API_KEY;
const location = process.env.location;
const units = process.env.units;
const url =

  "https://api.openweathermap.org/data/2.5/forecast?q=" +
  location +
  "&appid=" +
  API_KEY +
  "&units=" +
  units;

request(url, function (err, response, body) {
  if (err) {
    console.log("error:", err);
  } else {
    let weather = JSON.parse(body);
    let list = weather.list;
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthName = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    console.log("Weather Forecast:");
    let result = [];
    for (let i = 0; i < list.length; i++) {
      let time = list[i].dt_txt;
      result.push(time.indexOf("18:00:00"));
    }
    for (let j = 0; j < result.length; j++) {
      if (result[j] > -1) {
        const dates = new Date(list[j].dt_txt);

        let month = monthName[dates.getMonth()];
        let day = weekday[dates.getDay()];
        let year = dates.getFullYear();
        let temp = list[j].main.temp;
        let getDate = dates.getDate();

        console.log(`${day}, ${getDate} ${month} ${year}: ${temp}°C`);
      }
    }
  }
});
