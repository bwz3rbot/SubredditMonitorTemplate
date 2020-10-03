// Load with Environment Variables.
const dotenv = require('dotenv').config({
    path: "./pw.env"
});
// Require the Stream Generator
const submissions = require('./util/submissionStreamGenerator');

// Run the messaging queue...
submissions.streamSubmissions();

//It will continously run and when a new mention is received, it will add it the the queue to be processed when the ActionRequester object is ready for it.

// Your code will be run from the BotService module each time a new mention is received.