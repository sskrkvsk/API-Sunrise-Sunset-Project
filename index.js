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


app.post("/", async (req, res) => {
    try {
        const place = req.body.userInput;
        const resultMap = await axios.get(MAP_API_URL + `query=${place}`);

        const lat = resultMap.data.lattitude;
        const lng = resultMap.data.longitude;
        const resultSun = await axios.get(SUN_API_URL +`lat=${lat}&lng=${lng}`);

        const sunrise = resultSun.data.results.sunrise;
        const sunset = resultSun.data.results.sunset;

        res.render("index.ejs", {
            sunrise: sunrise,
            sunset: sunset,
        });
      } catch (error) {
        res.render("index.ejs", { user: error.response.data });
        res.status(500);
      }
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });