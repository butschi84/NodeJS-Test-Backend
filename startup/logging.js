const winston = require("winston");                 // error logger
require("express-async-errors");                    // route handling zusatzmodul - error handling

module.exports = function () {
    // Error handling
    
    winston.handleExceptions(
        new winston.transports.Console({
            colorize: true,
            prettyPrint: true}),
        new winston.transports.File({filename: "uncaughtExceptions.log"})
    )
    process.on("unhandledRejection",(ex) => {
        throw ex;
    });
    
    winston.add(winston.transports.File,{filename: "logfile.log"});
}