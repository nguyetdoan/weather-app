const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const forecast = require("./utils/forecast");
// Defined paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlerbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Nguyet Doan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Nguyet Doan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Nguyet Doan",
  });
});

app.get("/help/*", (req, res) => {
  res.render("notfound", {
    title: "Help",
    name: "Nguyet Doan",
    message: "Help article not found",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "You must provide a search term",
    });
    return;
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({ err: "You must provide an address" });
    return;
  }

  forecast(req.query.address, (err, data) => {
    if (err) {
      res.send({ err });
    } else res.send(data);
  });
});

app.get("*", (req, res) => {
  res.render("notfound", {
    title: "404",
    name: "Nguyet Doan",
    message: "My 404 page",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
