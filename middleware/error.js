const winston = require("winston");                 // error logger

module.exports = function(err,req,res,next){
    winston.error(err.message, err);
    res.status(500).send("Something went wrong.");
}