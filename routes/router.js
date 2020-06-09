const { Router } = require("express");
const router = Router();

const getWeather = require("../lib/getWeather");

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/", async (req, res) => {
  let city = req.body.city;
  let country = req.body.country;

  let data = await getWeather(city, country);

  if (data.cod !== "404") {
    let temp = data.main.temp;
    let wind = data.wind.speed;
    let description = data.weather[0].description;

    res.render("index", { data: { temp, description, wind } });
  } else {
    let message = "City Not Found";

    res.render("index", { data: { message } });
  }
});

module.exports = router;
