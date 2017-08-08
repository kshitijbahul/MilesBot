`use strict`;
const moment=require('moment-timezone');
const _=require('lodash');
var request=require('request');
const envVariables=require('./enviornmentVariables');
const salutation = moment().tz(envVariables.TimeZone).format('HH') <12 ? 'Good Morning' : (moment().format('HH') <16 ? 'Good Afternoon':'Good Evening');
const salutationEnd = moment().tz(envVariables.TimeZone).format('HH') <12 ? 'Day' : (moment().format('HH') <16 ? 'Afternoon': (moment().format('HH') <20 ? 'Evening':'Night'));
const sayAs = {
    "telephone": '<say-as interpret-as="telephone">',
    "digits": '<say-as interpret-as="digits">',
    "date": '<say-as interpret-as="date" format="mdy">',
    "sayasEnd" : '</say-as>',
    "whispered":'<amazon:effect name="whispered">',
    "amazonEffectEnd" :"</amazon:effect>"
};
const breaks = {
    "one" :'<break time="1ms"/> ',
    "two" :'<break time="2ms"/> ',
    "three" :'<break time="3ms"/> ',
    "four" :'<break time="4ms"/> ',
    "five" :'<break time="5ms"/> ',
    "eight" :'<break time="8ms"/> ',
    "ten" :'<break time="10ms"/> ',
    "fifteen" :'<break time="15ms"/> ',
    "twenty" :'<break time="20ms"/> ',
    "fifty" :'<break time="50ms"/> ',
    "hundred" :'<break time="100ms"/> ',
    "twoHundred" :'<break time="200ms"/> ',
    "fiveHundred" :'<break time="500ms"/> ',
    "eightHundred" :'<break time="800ms"/> ',
    "1s" :'<break time="1s"/> ',
    "2s" :'<break time="2s"/> ',
    "3s" :'<break time="3s"/> ',
};
module.exports = {
    breaks,
    sayAs,
    Salutation : salutation,
    WarmWelcomeSatus : `There are no registered faults in your area`,
    NoTelenorIdMentioned : `You did not mention a TelenorID, Could you mention the TelenorID again please ?`,
    InvalidTelenorId: `is not your TelenorID, Please mention your 6 digit TelenorID ?`,
    WelcomeMessage :`Welcome to Miles. ${breaks.twoHundred} I am MilesBot and I am going to help you control the lights`,
    CompressedMessage : `Here's what I can do for you.${breaks.fifty} I can help you check your balance , get your current internet usage and much more.${breaks.hundred} What would you like to do ?`,
    Welcome_Message :`Welcome to Telenor. I can help you with your Balance, current usage, Internet status. If you want I can also schedule an agent to call you for your invoices`,
    RandomNumberText : `Look what I rolled for you`,
    HELP_MSG_PAUSED : `${breaks.hundred}Can I help you with anything else ?`,
    HELP_MSG :` Can I help you with anything else ?`,
    STOP_MSG : `Goodbye ,Have a nice ${salutationEnd}`,
    LIGHTS_ON_MESSAGE : `I have switched On the lights for you.`,
    LIGHTS_OFF_MESSAGE : `I have switched off the lights for you.`,
    ContactUserMessage :` I have placed the request and you will be shortly contacted by our customer service team.`,
    SkillInformation : `MilesBot has been Built by Miles India`,
    AboutTelenor : `'teːlə'nuːr Group  is a Norwegian multinational telecommunications company headquartered at Fornebu in Bærum, close to Oslo. 
                    ${breaks.fifty}It is one of the world's largest mobile telecommunications companies with operations in Scandinavia, Eastern Europe and Asia. 
                    ${breaks.fifty}It has extensive broadband and TV distribution operations in four Nordic countries, and a 10-year-old research and business line for Machine-to-Machine technology. 
                    ${breaks.fifty}'teːlə'nuːr owns networks in 13 countries, and has operations in 29 countries.`,
    CompleteHelpMessage:`I can help you ${breaks.fifty} Check your current balance, 
                                        ${breaks.fifty} your current Internet Usage,  
                                        ${breaks.fifty} Postpone your invoice or ask 'teːlə'nuːr to call you regarding it,        
                                        ${breaks.fifty} Check your subscription, 
                                        ${breaks.fifty} Check network coverage in your area,         
                                        ${breaks.fifty} Increase your broadband speed ,
                                        ${breaks.fifty} Increase your Data Pack ,
                                        ${breaks.fifty} ask 'teːlə'nuːr to contact you , ${breaks.hundred} What would you like to do ? `
}                                
