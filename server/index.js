const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const val = require("./secret");
const { checkResponseStatus } = require("./utils");

const app = express();
const secret = process.env.FINNHUB_API_KEY || val;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "build")));

app.get("/stock/list", function (req, res) {
  return fetch(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${secret}`)
    .then(checkResponseStatus)
    .then((r) => r.json())
    .then((results) => res.status(200).send(results))
    .catch((err) => (err.message ? res.sendStatus(err.message) : res.sendStatus(500)));
});

app.get("/stock/candle", function (req, res) {
  const { symbol, resolution, from, to } = req.query;

  if (!symbol || !resolution || !from || !to) return res.status(400).send("Missing 1 or more query params");

  return fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${secret}`)
    .then(checkResponseStatus)
    .then((r) => r.json())
    .then((results) => res.status(200).send(results))
    .catch((err) => (err.message ? res.sendStatus(err.message) : res.sendStatus(500)));
});

// All other roots handled by serving the app
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(process.env.PORT || 5000, () => console.log("Server started successfully."));
