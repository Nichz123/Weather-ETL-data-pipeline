import axios from 'axios';


export default function search_weather() {
    const api_key = process.env.REACT_APP_API_KEY
    // Making a GET request
    axios.get('http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=' + api_key)
        .then(response => {
            console.log(response.data); 
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}