import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY


export default async function search_weather() {
    const form = document.getElementById('city-form');
    const formData = new FormData(form);

      // Extract values
      const fcity = formData.get('fcity');
      const fstate = formData.get('fstate');
      const fcountry = formData.get('fcountry');

    //Extract weather data first by finding the location, then the location's weather data
    const location = await geocode(fcity, fstate, fcountry)
    const weather = await get_weather(location)

    //Transform the returned data into a map
    const weather_data = new Map([['city', weather.name], ['temperature', weather.main.temp], ['description', weather.weather[0].description]]);

    //Load the map to into the website by changing the tables data
    load_data(weather_data)
}

async function geocode(city, state, country) {
    try {
        const location = await axios.get('http://api.openweathermap.org/geo/1.0/direct?q='+ city + ',' + state + ',' + country +'&limit=1&appid=' + api_key)
        return location.data

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function get_weather(location) {
    try {
        //&units=imperial mean Fahrenheit
        const weather = await axios.get("https://api.openweathermap.org/data/2.5/weather?lat=" + location[0].lat + "&lon=" + location[0].lon + "&units=imperial&appid=" + api_key)
        return weather.data
    } catch (error) {
        console.error('Error fetching data:', error);
        return;
    }
}

function load_data(data) {
    //weather_data headers: City, Temperature, Description
    data.forEach (function(value, key) {
        document.getElementById(key).innerHTML = value;
    })
}