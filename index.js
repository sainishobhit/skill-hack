const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require('./config');
const route = require('./routes');
require("dotenv").config();

const PORT = process.env.PORT || 3500;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, Authorization, X-Requested-With"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }

  next();
});

app.use("/v1", route);

app.get("/", async (req, res) => {
  return res.status(200).json({
    success: true,
    message: `Hello USER`,
  });
});

app.use((req, res, next) => {
  const error = new Error("route not found");
  error.status = 401;
  next(error);
});

app.use((error, req, res, next) => {
  return res.status(error.status || 500).json({
    success: false,
    message: error.message,
  });
});

app.listen(PORT, () => {
  console.log("server running on " + (process.env.PORT || 3500));
});
