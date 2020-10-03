# Subreddit Monitor Bot Template
Uses snoowrap to monitor a specific sub as defined in the pw.env file and emits all the new submissions.
Use this template to get started writing your own bot.

## About <a name = "about"></a>

This bot will get a stream of submissions from the MASTER_SUB as defined in the pw.env file.\
It will check for new submissions in that sub and will emit them into a queue.\
Your code will go in the BotService.js file.\
Each time a new submission is popped from the queue, BotService.doSomething() will be called and will be passed a single submission.


### Prerequisites

This application runs on NodeJS. Make sure you have an updated version of node downloaded to fit your system.\
You can find the download at https://nodejs.org/en/


Now that you have Node.js installed, you must create an account for the bot.



Once the account is created and you are logged into it, navigate to https://www.reddit.com/prefs/apps/


Here you will tell reddit about your bot and get the values needed to authenticate against the API.

1. click the [create app] button
2. give it a name
3. check the bubble for 'script'
4. give it a description
5. about url can be blank
6. redirect uri can be http://www.google.com (this doesn't matter but it must be there and be a valid uri)
7. Now that you have your script app created, you can use the values on this page to fill in your pw.env file

<img src='https://i.imgur.com/yq8akJ7.png'>


Navigate to pw.envEXAMPLE and remove EXAMPLE from the end of the filename.\
Now fill it in with the data you found at reddit.com/prefs/apps\
REDDIT_USER and REDDIT_PASS are the username and password of the bot account.\
MASTER_SUB will be the subreddit the bot will follow to get new submissions.\
LIMIT defaults to 6 but can be set up to 25 to accomidate for more submissions within a shorter interval.\
DEBUG_CODE will display information about the submission queue.\
DEBUG_NETWORK will display all the http error codes received. After the initial startup, status code 200 is expected every 20 seconds.
```
USER_AGENT=''
CLIENT_ID=''
CLIENT_SECRET=''
REDDIT_USER=''
REDDIT_PASS=''
MASTER_SUB=''
LIMIT=6
DEBUG_CODE=false
DEBUG_NETWORK=false
```



### Installing

Download the source code from this page.

Open up your terminal and cd into the folder of the files you just downloaded.

Install dependencies:
```
npm i
```

Run the bot:
```
node src/app.js
```

### What now?

Open up your favorite IDE and go into the BotService.js file.\
This is where you will write all of your code.\
You have access to the Snoowrap API here and a single submission from the defined subreddit.