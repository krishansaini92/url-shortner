const express = require("express");
const { server } = require('config');

const app = express();

app.use(express.json({}));
const port = process.env.PORT || server.port;
app.listen(port, () => console.log(`Server is listening on port ${port}`));


app.use((err, req, res, next) => {
  let error = { 
    statusCode: 400, 
    message: err.message
  };

  console.error('API Error', { error });
  res.status(error.statusCode).json(error);

  next();
});