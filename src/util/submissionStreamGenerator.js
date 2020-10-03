const
    colors = require('colors'),
    EventEmitter = require('events'),
    dateFormat = require('dateformat'),
    snoowrap = require('../config/snoo-config').streamRequester,
    actionRequester = require('../config/snoo-config').actionRequester,
    BotService = require('../service/BotService'),
    timeout = 20000,
    logging = JSON.parse(process.env.DEBUG_CODE) || false,
    limit = parseInt(process.env.LIMIT) || 6;

// [Submission Emitter]
class SubmissionEmitter extends EventEmitter {
    constructor(supply) {
        super();
    }
    submission(submission) {
        this.emit("submission", submission)
        if (listing.length = 0) {
            throw Error(`no submissions received!`)
        }
    }
}
const submissionEmitter = new SubmissionEmitter()

// 1. [Get New Submissions from Subreddit]
let previousMentionUTC;
const getListing = function () {
    if (logging) {
        console.log('initializing the stream...'.magenta)
    }
    return snoowrap.getSubreddit(process.env.MASTER_SUB).getNew({
            limit: limit
        })
        .then(listing => {
            mostRecentSubmission = listing[0]
            return listing
        })
}

// 2. [Assign First UTC]
const assignFirstUTC = function (listing) {
    previousMentionUTC = parseInt(listing[0].created_utc)
    listing.forEach(submission => {
        submissionEmitter.emit('submission', submission)
    })
}

// 3. [Stream In Submissions]
const streamInSubmissions = function () {

    // 3.a) Checks subreddit new at an interval of 20 seconds
    setInterval(() => {
        if (logging) {
            console.log("checking again...");
        }

        snoowrap.getSubreddit(process.env.MASTER_SUB).getNew({
            limit: limit
        }).then((listing) => {
            // 3.b) If a new item exists in the listing,
            listing.forEach(submission => {
                let created = parseInt(submission.created_utc);
                if (created > previousMentionUTC) {

                    submissionEmitter.emit('submission', submission);
                }
            });
            previousMentionUTC = parseInt(listing[0].created_utc);

        });
    }, timeout)
}

// [Run Once Indefinately] Checks the Messaging Queue For new items, processes them.
const newItems = [] // Messaging queue items are pushed into this array
const runOnceIndefinately = function () {
    if (logging) {
        console.log('NUMBER OF ITEMS IN THE QUEUE: ' + newItems.length)
    }

    if (newItems[0] != undefined) {
        // If item exists, it is popped out of the array and handled by the BotService
        newItem = newItems.pop()
        return actionRequester.getSubmission(newItem.id).fetch()
            .then((item) => {

                // BOT SERVICE CODE RUNS HERE!!
                BotService.doSomething(item)
                    .then(runOnceIndefinately)

            })
    } else {
        if (logging) {
            formattedDate = dateFormat(Date.now())
            console.log(formattedDate + '|  there are no items left in the queue! checking again in 20 seconds...'.red)
        }

        setTimeout(() => {
            runOnceIndefinately()
        }, timeout)
    }

}


// Main Loop of the stream.
const streamSubmissions = function () {
    getListing()
        .then(assignFirstUTC)
        .then(streamInSubmissions)
}

// 4. On Item Being Emitted, push the item into an array.
submissionEmitter.on("submission", (item) => {
    newItems.push(item)
    if (logging) {
        console.log(`New Item received!: ${dateFormat(Date.now())}`.yellow)
    }
})

// Startup Message
submissionEmitter.once("submission", () => {
    console.log(`Initializing.... Please wait while I check the ${limit} most recent submissions.`.bgBlack.yellow)
})

// Messaging Queue Popper
submissionEmitter.once("submission", () => {
    runOnceIndefinately();
})

module.exports = {
    streamSubmissions
}