import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
// + npm ejs

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const SUN_API_URL = `https://api.sunrise-sunset.org/json?`;
const MAP_API_URL = `http://api.positionstack.com/v1/forward?access_key=d7c905e5123d80ba30d8c84aebb497d3&`;


app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/sunrise", async (req, res) => {
    try {
        const place = req.body.userInput;
        const resultMap = await axios.get(MAP_API_URL + `query=${place}`);

        const lat = resultMap.data.data[0].latitude;
        const lng = resultMap.data.data[0].longitude;
        const resultSun = await axios.get(SUN_API_URL +`lat=${lat}&lng=${lng}`);

        const sunrise = resultSun.data.results.sunrise;
        res.render("partials/sunrise.ejs", {
            sunrise: sunrise,
        });
      } catch (error) {
        res.render("partials/sunrise.ejs", { user: error.response.data });
        res.status(500);
      }
  });

  app.post("/sunset", async (req, res) => {
    try {
      const place = req.body.userInput;
      const resultMap = await axios.get(MAP_API_URL + `query=${place}`);

      const lat = resultMap.data.data[0].latitude;
      const lng = resultMap.data.data[0].longitude;
      const resultSun = await axios.get(SUN_API_URL +`lat=${lat}&lng=${lng}`);

      const sunset = resultSun.data.results.sunset;
      res.render("partials/sunset.ejs", {
          sunset: sunset,
      });
      } catch (error) {
        res.render("partials/sunset.ejs", { user: error.response.data });
        res.status(500);
      }
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });