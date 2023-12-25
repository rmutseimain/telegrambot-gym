let { QuestionList } = require('./questions')
let { InlineKeyboardButton } = require('./keyboards')
const { BUTTON_OK, BUTTON_REMOVE, MESSAGE_TYPES, SURVEYS, COMMAND_MORNING, COMMAND_EVENING} = require('../constans')
const {bot} = require("../telegram-bot");



class Survey extends QuestionList {
    constructor(id, name, questions, initialMessage, extraText, command) {
        super(questions);
        this.surveyId = id
        this.name = name;
        this.initialMessage = initialMessage;
        this.extraText = extraText
        this.command = command;
        this.button = {
            reply_markup: {
                inline_keyboard: [[new InlineKeyboardButton(
                    {
                        text: this.initialMessage,
                        callback_data: JSON.stringify(this.getCallBackData(this.command))
                    })]
                ]
            }
        };
        this.initialChatId = null;
    }

    getCallBackData(text, question) {
        return {
            text: text,
            type: MESSAGE_TYPES.SURVEY,
            surveyId: this.surveyId,
            questionId: question?.id
        }
    }

    generateButtons(question) {
        let buttons = []
        let firstLine = [];
        let secondLine = [];
        let thirdLine = [];

        for (let i = 1; i <=10; i++) {

            if (i <= 5) {
                firstLine.push(new InlineKeyboardButton({
                    text: i.toString(),
                    callback_data: JSON.stringify(this.getCallBackData(i, question))
                }))
            } else {
                secondLine.push(new InlineKeyboardButton({
                    text: i.toString(),
                    callback_data: JSON.stringify(this.getCallBackData(i, question) )
                }))
            }
        }

        thirdLine.push(new InlineKeyboardButton({
            text: BUTTON_OK,
            callback_data: JSON.stringify(this.getCallBackData(BUTTON_OK, question))
        }))
        thirdLine.push(new InlineKeyboardButton({
            text: BUTTON_REMOVE,
            callback_data: JSON.stringify(this.getCallBackData(BUTTON_REMOVE, question))
        }))

        buttons.push(firstLine)
        buttons.push(secondLine)
        buttons.push(thirdLine)
        return buttons;
    }

    saveInitialChatId(chatId) {
        this.initialChatId = chatId;
    }
}

class SurveyList {
    /**
     * @param props
     * @params [Array] props - the list of Objects
     * @params [Object] survey - the object of survey's props
     * @params [String] survey.name - name of survey
     * @params [Array] survey.questions - the list of questions for survey
     * @params [String] survey.initialText - the initial message before starting survey
     * @params [String] survey.extraText - the extra text message while initialize survey
     * @params [String] survey.command - the extra text message while initialize survey
     */
    constructor(props) {
        this.surveys = this.generateSurveys(props)
    }

    generateSurveys(props) {
        return props.map((survey, index) => {
            return new Survey(index, survey.name, survey.questions, survey.initialMessage, survey.extraText, survey.command)
        })
    }

    getSurveyByCommand(command) {
        return this.surveys.filter(survey => survey.command === command)[0]
    }

    getSurveyById(surveyId) {
        return this.surveys.filter(survey => survey.surveyId === surveyId)[0]
    }

    async handleSurvey(query, callback) {
        const { message: {chat, message_id, text } } = query;

        let survey = surveyList.getSurveyById(callback.surveyId);
        let mainQuestion = survey.getMainQuestion()
        let question = survey.getQuestion(callback.questionId);

        if ([COMMAND_MORNING, COMMAND_EVENING].includes(callback.text)) {
            await bot.editMessage(chat.id, message_id, text)
            bot.sendSurvey(chat.id, mainQuestion, survey, true)
            console.log('Survey has started, sent first question - ', mainQuestion)
            return;
        }

        if (callback.text === BUTTON_OK) {
            if (question.text === text) {
                bot.answerCallbackQuery(query.id, {
                    text: 'Введіть результат',
                    show_alert: true
                })
                return
            }

            if (question?.latestQuestion) {
                bot.editMessage(chat.id, message_id, text)
                bot.editMessage(chat.id, survey.initialChatId, survey.initialMessage + ' ✅')
                console.log('Survey ended text modified - ', text)
                return
            }

            if (!question?.latestQuestion) {
                bot.editMessage(chat.id, message_id, text)
                bot.sendSurvey(chat.id, survey.getNextQuestion(callback.questionId), survey, true)
                console.log('Last question sent - ', text)
                return
            }
        }

        if (callback.text === BUTTON_REMOVE) {
            let sentText = text.endsWith(':') ? text : text.slice(0, -1)
            bot.editMessage(chat.id, message_id, sentText, survey.generateButtons(question))
            console.log('Removed element - ', sentText)
            return
        }

        // update message when client click on any digit
        let sendText =  text.endsWith(':') ? text + ' ' + callback.text : text + callback.text;
        bot.editMessage(chat.id, message_id, sendText, survey.generateButtons(question))
        console.log('Question modified - ', sendText)
    }

}

let surveyList = new SurveyList(SURVEYS)

module.exports = { surveyList }