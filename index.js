const express = require("express");
const { server } = require("config");
const shortUrlRoute = require("./routes/short-url");

const app = express();

app.use(express.json({}));

const port = process.env.PORT || server.port;
app.listen(port, () => console.log(`Server is listening on port ${port}`));

app.use("/short-url", shortUrlRoute);

app.use((err, req, res, next) => {
  let error = {
    statusCode: 400,
    message: err.message
  };

  console.trace("API Error", { error });
  res.status(error.statusCode).json(error);

  next();
});

module.exports = app;
