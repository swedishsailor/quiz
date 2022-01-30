var QuestionsAndAnswers = /** @class */ (function () {
    function QuestionsAndAnswers() {
    }
    QuestionsAndAnswers.create = function (data) {
        return { question: data.question, answers: data.answers, isCorrect: data.isCorrect, points: data.points };
    };
    QuestionsAndAnswers.prototype.next = function () {
    };
    return QuestionsAndAnswers;
}());
var testQAndA = QuestionsAndAnswers.create({ question: 'north america', answers: ['lul', 'essalysoly'], isCorrect: true, points: 20 });
console.log(testQAndA);
// Query Selectors
var startButton = document.querySelector('.startButton');
var informationsButton = document.querySelector('.informationsButton');
var optionsButton = document.querySelector('.optionsButton');
var inGameViewTemplate = document.getElementById('inGameViewTemplate');
var inGameViewTemplateContent = inGameViewTemplate.content;
// On click Start Button
startButton.addEventListener('click', function (e) {
    e.preventDefault();
    //const copy = inGameViewTemplateContent.cloneNode(true);
    document.body.innerHTML = '';
    document.body.appendChild(inGameViewTemplateContent);
});
