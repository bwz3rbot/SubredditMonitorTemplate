const colors = require('colors');
const Snoowrap = require('snoowrap');
const requester = require('../config/snoo-config').actionRequester;
const fs = require('fs');

// This is where your code will go.
// This function is called each time a new message is popped from the array.
// It gives you a pre-fetched 'RedditObject' of type submission.
// The code relies on saving items to know which has already been processed.
// So if you don't save a submission, it will be processed twice.
// Be sure to be saving and save-checking every single time!
async function doSomething(submission) {
    // Checking if the item was saved will keep the bot from processing anything twice.
    if (!submission.saved) {
        console.log(`processing item: ${submission.id}`)
        //
        // CODE STARTS HERE //
        console.log(submission)



        // CODE ENDS HERE //
        //
        // Be sure to finish with saveItem(item) so the item will not be processed again.
        await saveItem(submission) // Leave this line where it is!
        return console.log(`item  ${submission.id} successfully processed!`)
    } else {
        return console.log(`item already saved. skipping`.gray)
    }
}

// Write your functions here!




// Leave this save function alone!
const saveItem = function (item) {
    console.log("saving the item...".grey)
    return requester.getSubmission(item.id).save();
}
module.exports = {
    doSomething: doSomething
}