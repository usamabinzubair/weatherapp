const hbs = require('express-handlebars');
const path = require('path');
const express = require('express');


const app = express();
require('dotenv').config();

const getWeather = require('./lib/getWeather');

app.use(express.static(path.join(__dirname, 'public'))); //static for any static data that will go to public folder.

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}))

app.set('view engine', '.hbs');

app.get('/', async(req,res) => {

    let data = await getWeather();

    console.log(data);
    
    res.render('index', {data: 'HELLO FROM EXPRESS'}); // can use render instead fo sendfile

});

app.listen(3000, () =>{
    console.log('server listening on port 3000');

});