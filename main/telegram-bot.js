
const TelegramBot = require('node-telegram-bot-api');
const calendar = require('telegram-bot-calendar');

const { TELEGRAM_TOKEN, HEALTH_CHECK_TIMEOUT} = require("./constans");
const axios = require("axios");

class GymBot extends TelegramBot {
    constructor() {
        super(TELEGRAM_TOKEN, { polling: true });

        setInterval(this.healthCheck, HEALTH_CHECK_TIMEOUT)
    }

    async healthCheck() {
        await axios.get(process.env.SERVER_HOST)
    }

    sendMessage(chatId, text, form = {}) {
        return super.sendMessage(chatId, text, form);
    }

    sendSurvey(chatId, question, survey, buttons = true) {
        console.log(`Send message with params: `, { chatId, text: question.text })


        if (!question) {
            console.log(`sendMessage the question is undefined`, question);
            return;
        }

        let form = {
            reply_markup: {
                inline_keyboard: survey.generateButtons(question)
            }
        }

        return bot.sendMessage(chatId, question.text, buttons ? form : {})
            .then(() => {
                question.updateSent(true);
            })
            .catch(error => {
                question.updateSent(false);
                console.log(JSON.stringify(error, undefined, 4))
            })
    }


    editMessage(chatId, message_id, text, buttons ) {

        console.log(`Edit message with params: `, { chatId, message_id, text })

        let form = {
            chat_id: chatId,
            message_id
        }

        if (buttons) form = {
            ...form,
            reply_markup: {
                inline_keyboard: buttons
            }
        };

        return super.editMessageText(text, form).catch(error => console.log(`Edit error for ${message_id} and ${text}`, error))

    }

    sendCalendar(chatId, text) {
        const todaysDate = Date.now();
        const calendarUI = calendar.getUI(todaysDate);

        return this.sendMessage(chatId, text ? text : '', {
            reply_markup: calendarUI
        })
    }

    handleCalendarMessage(query) {
        console.log(' Processing message from Calendar ')
        const { message: { chat, message_id, date } } = query;
        bot.editMessage(chat.id, message_id, this.convertTimestamp(date))
    }

    convertTimestamp(timestamp) {

        let time = new Date(timestamp*1000);

        return ('0' + time.getUTCDate()).slice(-2) +
            '/' + ('0' + time.getUTCMonth()).slice(-2) +
            '/' + time.getUTCFullYear()
    };
}

const bot = new GymBot();
module.exports = { bot }
