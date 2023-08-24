import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
// + npm ejs

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const API_URL = "https://example-api.com/random";

app.get("/", (req, res) => {
    res.render("index.ejs");
})


app.post("/", async (req, res) => {
    try {
        const result = await axios.get(API_URL);
        const x = result.data;

        res.render("index.ejs", {});
      } catch (error) {
        res.render("index.ejs", { user: error.response.data });
        res.status(500);
      }
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });