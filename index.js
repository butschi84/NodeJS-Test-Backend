const winston = require("winston");
const express = require("express");                 // route handling framework
const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/validation")();

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}`));
app.timeout=10000; 