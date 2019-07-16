#!/usr/bin/node
const tmi = require('tmi.js');
const func = require('./includes/functions.js');
// Get authentication data
let AuthDetails = require("./includes/auth.json");
let pendu = require("./pendu.js");
// Valid commands start with:
let commandPrefix = '!';
// Define configuration options:
let opts = {
    identity: {
        username: AuthDetails.user,
        password: AuthDetails.token
    },
    channels: [
        "#cruelladk",
        "#kedribot"
    ],
    connection: {
        reconnect: true
    }
};

// Helper function to send the correct type of message:
function sendMessage(target, context, message) {
    client.say(target, message);
}
function sendWhisp(username, context, message) {
    client.whisper(username, message);
}
// Create a client with our options:
let client = new tmi.client(opts);


// Register our event handlers (defined below):
var CooldownManager = {
    cooldownTime: 8000, // 8 seconds
    store: {
        '!pendu': 1543848572,
        '!devine': 1543848572,
		'kedribot':1543848572
    },

    canUse: function (commandName) {
        // Check if the last time you've used the command + 30 seconds has passed
        // (because the value is less then the current time)
        return this.store[commandName] + this.cooldownTime < Date.now();
    },

    touch: function (commandName) {
        // Store the current timestamp in the store based on the current commandName
        this.store[commandName] = Date.now();
    }
};

client.on('message', onMessageHandler);

// Connect to Twitch:
client.connect();


// Called every time a message comes in:
async function onMessageHandler(target, context, msg, self) {
try {
	if (msg.toLowerCase().includes('kedribot')) {
        if (CooldownManager.canUse('kedribot')) {
            CooldownManager.touch('kedribot');
        } else {
            return;
        }
    }
    if (self || context['message-type'] === 'whisper') {
        return;
    }
    func.addToDb(msg, context);
	if((msg.toLowerCase().includes('kedribot') || msg.toLowerCase().includes('@kedribot')) && msg.toLowerCase().includes('est beau')) {
		client.say(target, "Merci "+context.username+", toi aussi <3 <3 ")
    }
    if((msg.toLowerCase().includes('kedribot') || msg.toLowerCase().includes('@kedribot')) && (msg.toLowerCase().includes('est moche') || msg.toLowerCase().includes('est laid'))) {
		client.say(target, "Reste polis et courtois "+context.username+", sinon le ban sera pour toi. PunOko")
	}
	await pendu.pendu(msg, client, target, context,CooldownManager,commandPrefix);

}
catch(err) {
	console.log(err);
	throw Error(err);
}
}
