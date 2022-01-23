const express = require("express");                 // route handling framework
const topic = require("../routes/topic");
const error = require("../middleware/error");
const cors = require("cors");
const swaggerUI = require('swagger-ui-express')
const yamljs = require('yamljs');

module.exports = function(app) {
    //enables cors
    app.use(cors({
        'allowedHeaders': ['sessionId', 'Content-Type', "x-auth-token"],
        'exposedHeaders': ['sessionId'],
        'origin': '*',
        'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
        'preflightContinue': true
    }));

    //swagger configuration
    const swaggerDoc = yamljs.load(`public/swagger.yaml`);
    const options = {
      explorer: false,
      swaggerOptions: {
        authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "x-auth-token <JWT>"} },
        docExpansion: 'none'
      },
      customCssUrl: '/feeling-blue.css'
    };

    app.use(express.json());
    app.use(express.static("public"));
    app.use("/api/topics/",topic);
    app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDoc, options));
    app.use(error);                              // Middleware - die letzte middleware in der pipeline ist der error handler
}