const fetch = require('node-fetch');


const getWeather = async(city, country) => {
    let data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${process.env.APPID}`);

    return await data.json();


}



module.exports = getWeather;