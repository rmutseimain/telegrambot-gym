const TELEGRAM_TOKEN = '6062494950:AAEXVVeDhomAVBf-2lzK14-x4afJ29o84zk';

const COMMAND = '_survey'
const COMMAND_MORNING = '/morning_survey'
const COMMAND_EVENING = '/evening_survey'
const BUTTON_OK = 'OK';
const BUTTON_REMOVE = 'Remove';

const MORNING_QUESTIONS = [
    '1. Количество часов сна:',
    '2. Качество сна:',
    '3. Уровень энергии:'
];

const MORNING_EXTRA_TEXT = 'Задания на сегодня:\n' +
    ' 1.  💧 стакан тёплой воды с 🍋 на голодный желудок утром\n' +
    ' 2.  ⚖️ скинуть фотографию взвешивания на голодный желудок\n' +
    ' 3.  📸 фото всех приемов пищи в течении дня \n' +
    ' 4.  🚶🏼 шаги не менее 7 000 + тренировка 🏋️‍♀️ \n' +
    ' 5. 💦  выполнить норму воды (Прием води 400-500мл. Можно не сразу частями выпить, минимум за 15 мин до приема пищи)\n' +
    ' 6.  🥗 контролировать калорийность не превышать свою суточную норму'


const EVENING_QUESTIONS = [
    '1. Уровень стресса:',
    '2. Уровень физической нагрузки:',
    '3. Удовлетворенность рационом: ',
    '4. Насыщенность рационом:',
    '5. Количество приемов пищи:',
    '5. Количество шагов: '
];

const EVENING_EXTRA_TEXT = '';

const SURVEYS = [
    {
        name: 'Morning Survey',
        initialMessage: 'Пройти ранкове опитувення',
        extraText: MORNING_EXTRA_TEXT,
        questions: MORNING_QUESTIONS,
        command: COMMAND_MORNING
    },
    {
        name: 'Evening Survey',
        initialMessage: 'Пройти вечірнє опитування',
        extraText: EVENING_EXTRA_TEXT,
        questions: EVENING_QUESTIONS,
        command: COMMAND_EVENING
    }
]

const CALENDAR_MORNING_MESSAGE = 'Виберіть день для ранкового опитування'
const CALENDAR_EVENING_MESSAGE = 'Виберіть день для ранкового опитування'

const MESSAGE_TYPES = Object.freeze({
    TEXT: 'Text',
    CALENDAR: 'Calendar',
    SURVEY: 'Survey'
})

module.exports = {
    TELEGRAM_TOKEN,
    MORNING_QUESTIONS,
    MORNING_EXTRA_TEXT,
    EVENING_QUESTIONS,
    EVENING_EXTRA_TEXT,
    COMMAND,
    COMMAND_MORNING,
    COMMAND_EVENING,
    BUTTON_OK,
    BUTTON_REMOVE,
    SURVEYS,
    MESSAGE_TYPES,
    CALENDAR_MORNING_MESSAGE,
    CALENDAR_EVENING_MESSAGE
}