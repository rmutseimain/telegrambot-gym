class QuestionList {
    constructor(questions) {
        this.questionList = this.generateQuestions(questions)
    }

    generateQuestions(questionsList) {
        if (!(questionsList instanceof Array)) {
            console.warn('The questions in not an array object')
            return;
        }

        if (questionsList.length === 0) {
            console.warn('The questions in empty')
            return;
        }

        return questionsList.map((question, index) => {
            return new Question(index, question, index + 1 === questionsList.length)
        })
    }

    getMainQuestion() {
        return this.getQuestion(0);
    }

    getQuestion(id) {
        return this.questionList.filter( question => question.id === id)[0]
    }

    getNextQuestion(id) {
        let question = this.getQuestion(id);

        if (!question) console.error(`Next question wasn't found`)

        return this.getQuestion(question.nextQuestionId)
    }
}
class Question {
    constructor(id, text, latest) {
        this.id = id;
        this.nextQuestionId = id + 1;
        this.text = text;
        this.sent = false;
        this.answer = '';
        this.latestQuestion = latest
    }

    updateSent(status) {
        this.sent = status
    }

    updateAnswer(answer) {
        this.answer = answer
    }

}

module.exports = {
    QuestionList
}