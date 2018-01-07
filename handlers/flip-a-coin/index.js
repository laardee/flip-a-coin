'use strict';

const Random = require("random-js");
const random = new Random(Random.engines.mt19937().autoSeed());

module.exports.handler = (event, context, callback) => {
  console.log(JSON.stringify(event, null, 2));
  let response;

  if (event.request && event.request.intent && event.request.intent.name === 'HeadsOrTails') {
    const headsOrTails = random.bool() ? 'heads' : 'tails';
    const result = headsOrTails === event.request.intent.slots.HeadsOrTailsSlot.value.toLowerCase() ? 'won' : 'loose';
    response = {
      version: '1.0',
      response: {
        outputSpeech: {
          type: 'PlainText',
          text: `Got ${headsOrTails}, you ${result}. Best out of three?`,
        },
        shouldEndSession: false,
      },
    };
  } else {
    response = {
      version: '1.0',
      response: {
        outputSpeech: {
          type: 'PlainText',
          text: 'Heads or tails?',
        },
        shouldEndSession: false,
      },
    };
  }
  return callback(null, response);
};
