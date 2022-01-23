// models
const { getTopics, validate, addTopic } = require("../models/topic")
const winston = require("winston");

//helpers
const express = require("express");
const router = express.Router();

// Get all topics
router.get("/", async (req,res) => {
    const topics = await getTopics();
    winston.info(topics)
    // return results
    res.status(200).send(topics);
});

// Add a topic
router.post("/", async (req,res) => {
    winston.info("topics: request to create new topic");

    // validate topic 
    const { error } = validate(req.body);
    if(error){ return res.status(400).send(error.details[0].message); }

    // create topic
    addTopic(req.body.name);

    res.send(req.body.name);

});

router.delete("/:topic", async (req,res)=> {

});

module.exports = router;