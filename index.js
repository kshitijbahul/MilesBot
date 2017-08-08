'use strict';

const Alexa=require('alexa-sdk');
const APP_ID = 'amzn1.ask.skill.d42a1475-25c6-41c5-93a5-9a4b02c6be65';
const Messages = require('./BotMesages'); 
var moment = require('moment');
var request = require('request');
const envVariables = require ('./enviornmentVariables');

const handlers = {
    'LaunchRequest' : function(){
        this.attributes['context'] = 'LaunchRequest';
        this.attributes['welcomeMessage'] = true;
        this.emit(`WelcomeMessageIntent`); 
        console.log(`Here in WelcomeMessage Intent ${JSON.stringify(this)}`);
        //request.get('http://125.63.86.179/cgi-bin/relay.cgi?state').onRequestResponse(console.log('Hello'));
        request.get('http://125.63.86.179/cgi-bin/relay.cgi?state').on('response',function(response){
            console.log(JSON.stringify(response));
        })

    },
    'WelcomeMessageIntent' : function(){
        console.log(`Here in WelcomeMessage Intent ${JSON.stringify(this)}`);
        //this.emit(':askWithCard',`${Messages.Salutation} ${envVariables.CurrentUser} ${Messages.breaks.twoHundred} ${Messages.WelcomeMessage} ${Messages.breaks.fiveHundred} ${Messages.WarmWelcomeSatus} ${Messages.breaks.eightHundred}${Messages.CompressedMessage}`,`${Messages.CompressedMessage}`)
        this.emit(':askWithCard',`${Messages.Salutation}  ${Messages.breaks.fiveHundred} ${Messages.WelcomeMessage} ${Messages.HELP_MSG_PAUSED}`,Messages.HELP_MSG_PAUSED)
    },
    'StopSwitch' : function(){
        let session = this;
        console.log(`Here in StopSwitch Intent ${JSON.stringify(this)}`);
        request.get('http://125.63.86.179/cgi-bin/relay.cgi?off').on('response',function(response){
            console.log(JSON.stringify(response));
            console.log(JSON.stringify(session));
            session.emit(":ask",` ${Messages.LIGHTS_OFF_MESSAGE}`);
        });
    },
    'StartSwitch': function(){
        let session = this;
        console.log(`In  StartSwitch ${JSON.stringify(this)}`);
        this.attributes['context'] = 'CheckCurrentBalanceNonContextualIntent';
        request.get('http://125.63.86.179/cgi-bin/relay.cgi?on').on('response',function(response){
            console.log(JSON.stringify(response));
            console.log(JSON.stringify(session));
            session.emit(":tell",` ${Messages.LIGHTS_ON_MESSAGE}`);
        })
    },
    'SkillInformation': function () {
        console.log(`In  SkillInformation ${JSON.stringify(this)}`);
        this.emit(':tell', `${Messages.SkillInformation} ${Messages.HELP_MSG_PAUSED}`,Messages.HELP_MSG);
    },
    'AMAZON.CancelIntent': function () {
        console.log('Came in here in CancelIntent')
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.StopIntent': function () {
        console.log(`Came in here in StopIntent ${JSON.stringify(this)}`)
        this.emit(':tell', `${Messages.STOP_MSG}`);
    },
    'SessionEndedRequest': function () {
        console.log('Came in here in SessionEndedRequest calling AMAZON.StopIntent')
        //this.emit('AMAZON.StopIntent');
    }
};
exports.handler = (event, context) => {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
    //TODO
    // Multiple States
    // Multiple registerHandlers
    // Display Cards
};
