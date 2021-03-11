const express = require("express");

var shortUrlRoute = express.Router();

shortUrlRoute.post("/", async ({ body: { longUrl } }, res, next) => {
  return longUrl;
});

module.exports = shortUrlRoute;
