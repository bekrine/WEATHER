const { request, response } = require("express");
const fetch = require("node-fetch");
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.static("public"));

app.listen("3000", () => {
  console.log("listning to 300");
});

app.get("/weather/:country", async (request, response) => {
  const contry = request.params.country;
  const API_Key = process.env.MY_KEY;
  const weather_res = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${API_Key}&q=${contry}&aqi=no`
  );
  const data = await weather_res.json();
  response.json(data);
});

app.get("/country", async (request, response) => {
  const country_res = await fetch(`https://api.first.org/data/v1/countries`);
  const data_country = await country_res.json();
  response.json(data_country);
});
