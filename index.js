const hbs = require('express-handlebars');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
require('dotenv').config();

const getWeather = require('./lib/getWeather');

app.use(express.static(path.join(__dirname, 'public'))); //static for any static data that will go to public folder.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());  
app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}))

app.set('view engine', '.hbs');

app.get('/', (req,res) => {

    res.render('index')    // can use render instead fo sendfile

});

app.post('/', async(req,res) => {

    let city = req.body.city;
    let country = req.body.country;


let data = await getWeather(city, country);

console.log(data);
if (data.cod !== '404') {
let temp = data.main.temp;
let wind = data.wind.speed;
let description = data.weather[0].description

res.render('index', {data:{description,temp, wind}});

}

else { 

    let message = "City Not Found"

    res.render('index', {data:{message}}); 

}
})

app.listen(3000, () =>{
    console.log('server listening on port 3000');

});