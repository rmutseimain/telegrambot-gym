"use strict";

// init server
require('dotenv').config()

// init bot
const ramda = require('ramda')

const { bot } = require('./main/telegram-bot')
const { surveyList } = require('./main/survey/survey')
const {
    COMMAND,
    COMMAND_MORNING,
    COMMAND_EVENING, MESSAGE_TYPES, CALENDAR_MORNING_MESSAGE, CALENDAR_EVENING_MESSAGE,
} = require("./main/constans");


bot.setMyCommands([
    {command: COMMAND_MORNING, description: 'Morning'},
    {command: COMMAND_EVENING, description: 'Evening'}
])

bot.onText(new RegExp(`(.+)(${COMMAND})`), async (msg, [ match ]) => {
    const { chat: { id } } = msg;

    switch (match) {
        case COMMAND_MORNING:
            await bot.sendCalendar(id, CALENDAR_MORNING_MESSAGE)

            let morningSurvey = surveyList.getSurveyByCommand(COMMAND_MORNING)
            await bot.sendMessage(id, morningSurvey.initialMessage, morningSurvey.button)
                .then(res => morningSurvey.saveInitialChatId(res.message_id))
                .catch(error => console.log(JSON.stringify(error, undefined, 4)))

            if (morningSurvey.extraText && morningSurvey.extraText.length > 0) await bot.sendMessage(id, morningSurvey.extraText)
            break;
        case COMMAND_EVENING:
            await bot.sendCalendar(id, CALENDAR_EVENING_MESSAGE)

            let eveningSurvey = surveyList.getSurveyByCommand(COMMAND_EVENING)
            await bot.sendMessage(id, eveningSurvey.initialMessage, eveningSurvey.button)
                .then(res => eveningSurvey.saveInitialChatId(res.message_id))
                .catch(error => console.log(JSON.stringify(error, undefined, 4)))

            if (eveningSurvey.extraText && eveningSurvey.extraText.length > 0) await bot.sendMessage(id, eveningSurvey.extraText)
            break;

        default:
            break
    }
});

/*
bot.on('message', async message => {
    console.log(JSON.stringify(message, undefined, 4))
})
 */

bot.on('callback_query', async (query) => {
    console.log(JSON.stringify(query, undefined, 4))

    let callback;

    if (query.data) {
        try {
            callback = JSON.parse(query.data);
        } catch (e) {
            console.warn('Failed to parse callback')

            if (query.data.startsWith('clndr')) {
                callback = {
                    type: MESSAGE_TYPES.CALENDAR
                }
            }
        }
    }

    if (!ramda.isEmpty(callback) && ramda.isNotNil(callback)) {
        switch (callback.type) {
            case MESSAGE_TYPES.SURVEY:
                await surveyList.handleSurvey(query, callback)
                break
            case MESSAGE_TYPES.TEXT:
                break
            case MESSAGE_TYPES.CALENDAR:
                await bot.handleCalendarMessage(query)
                break
            default:
                break
        }
    }
})