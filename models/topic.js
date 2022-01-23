const Joi = require("joi");
const fs = require('fs');
const winston = require("winston");
const config = require("config");

// save all topics to file
function saveFile(topics) {
  const saveText = JSON.stringify(topics);

  fs.writeFile(config.storagePath, saveText, function (err) {
    if (err) return winston.error(err);
  });
}
async function getTopics() {
  winston.info("loading topics from storage file");
  try {
    const content = fs.readFileSync(config.storagePath);
    return JSON.parse(content);
  }catch{
    winston.error("could not load topics from file");
    return [];
  }
}

async function addTopic(sTopic) {
  let topics = await getTopics();
  topics.push(sTopic);
  saveFile(topics);
}

// function for input validation
function validateTopic(topic) {
  const scheme = new Joi.object({
    name: Joi.string().min(3).max(50).required()
  });
  const result = scheme.validate(topic);
  return result;
}

module.exports.validate = validateTopic;
module.exports.addTopic = addTopic;
module.exports.getTopics = getTopics;