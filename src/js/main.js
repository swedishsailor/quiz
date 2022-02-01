"use strict";
exports.__esModule = true;
var data_js_1 = require("./data.js");
var QuestionsAndAnswers = /** @class */ (function () {
    function QuestionsAndAnswers(question, answers, points) {
        this.question = question;
        this.answers = answers;
        this.points = points;
    }
    QuestionsAndAnswers.prototype.render = function (HTMLElement, timeLeft) {
        var newHTML = "    \n        <div id=\"inGameView\">\n        <p class=\"timeLeft\"> Time left: " + timeLeft + " sec</p>\n        <h2>Question</h2>\n        <p class=\"question\">" + this.question + "</p>\n        <div class=\"answers\">\n          <div class=\"leftPanel\">\n            <button value=\"" + this.answers[0][1] + "\" class=\"answer1\" id=\"answersButton\">" + this.answers[0][0] + "</button>\n            <button value=\"" + this.answers[1][1] + "\" class=\"answer2\" id=\"answersButton\">" + this.answers[1][0] + "</button>\n          </div>\n          <div class=\"rightPanel\">\n            <button value=\"" + this.answers[2][1] + "\" class=\"answer3\" id=\"answersButton\">" + this.answers[2][0] + "</button>\n            <button value=\"" + this.answers[3][1] + "\" class=\"answer4\" id=\"answersButton\">" + this.answers[3][0] + "</button>\n          </div>\n        </div>\n      </div>";
        HTMLElement.innerHTML = newHTML;
    };
    QuestionsAndAnswers.prototype.onClick = function (e) {
        console.log(e);
    };
    return QuestionsAndAnswers;
}());
/**
 * Functions
 */
// After data fetching create every Object and run methods on it
var randomQuestion = function (HTMLElement) {
    setTimeout(function () {
        /*for(let i = 0; i<Object.keys(data).length; i++)
        {
            const newQAndA = QuestionsAndAnswers.create(data[i]);
            console.log(newQAndA);
        }*/
        var randomSet = Math.floor(Math.random() * Object.keys(data).length);
        console.log(data[randomSet]);
        var test = new QuestionsAndAnswers(data[randomSet].question, data[randomSet].answers, data[randomSet].points);
        test.render(HTMLElement, 30);
    }, 355);
};
var countTime = function (timeLeft) {
    var time = setInterval(function () {
        console.log(timeLeft);
        timeLeft--;
        document.querySelector('#inGameView').querySelector('.timeLeft').innerHTML = "Time left: " + timeLeft + " sec";
        if (timeLeft <= 0) {
            clearInterval(time);
            return true;
        }
        return false;
    }, timeLeft * 1000 / 30);
};
// Constants and IMPORTANT vars
var data;
var QUESTION_TIME = 30;
// Query Selectors
var startButton = document.querySelector('.startButton');
var informationsButton = document.querySelector('.informationsButton');
var optionsButton = document.querySelector('.optionsButton');
//@ts-ignore
var inGameViewTemplate = document.getElementById('inGameViewTemplate');
var inGameViewTemplateContent = inGameViewTemplate.content;
var inGameViewCopy = inGameViewTemplate;
/**
 *  Events
 */
startButton.addEventListener('click', function (e) {
    e.preventDefault();
    document.body.innerHTML = '';
    document.body.appendChild(inGameViewTemplateContent);
    countTime(QUESTION_TIME);
});
informationsButton.addEventListener('click', function (e) {
    e.preventDefault();
});
optionsButton.addEventListener('click', function (e) {
    e.preventDefault();
});
// On click Quiz answers
document.addEventListener('click', function (e) {
    if (e.target.id === "answersButton") {
        console.log(e.target.value);
        if (e.target.value === 'true') {
            e.target.classList.add('correct');
            countTime(5);
        }
        else if (e.target.value = 'false') {
            e.target.classList.add('bad');
            for (var i = 0; i < document.querySelectorAll('#answersButton').length; i++) {
                //@ts-ignore
                if (document.querySelectorAll('#answersButton')[i].value === 'true') {
                    document.querySelectorAll('#answersButton')[i].classList.add('correct');
                }
            }
            countTime(5);
        }
        var randomSet = Math.floor(Math.random() * Object.keys(data).length);
        var newSet_1 = new QuestionsAndAnswers(data[randomSet].question, data[randomSet].answers, data[randomSet].points);
        var time = setTimeout(function () {
            newSet_1.render(document.getElementById('inGameView'), 5);
            countTime(QUESTION_TIME);
        }, 5 * 1000);
    }
});
/**
 * INIT MAIN
 */
var dataReceive = function () { return data_js_1.getData.then(function (result) { data = result; }); };
dataReceive();
randomQuestion(document.getElementById('inGameViewTemplate'));
