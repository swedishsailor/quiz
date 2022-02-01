"use strict";
exports.__esModule = true;
var data_js_1 = require("./data.js");
var QuestionsAndAnswers = /** @class */ (function () {
    function QuestionsAndAnswers(question, answers, points) {
        this.question = question;
        this.answers = answers;
        this.points = points;
    }
    QuestionsAndAnswers.prototype.render = function () {
        var containerHTML = inGameViewTemplate.innerHTML;
        // Replace {{Quiz}}
        document.getElementById('inGameViewTemplate').innerHTML = containerHTML.replace(/{{[A-z]{0,16}}}/g, "" + this.question);
        var answers = inGameViewTemplateContent.querySelectorAll('#answersButton');
        console.log(answers);
        // Replace all {{Answers}}
        for (var i = 0; i < answers.length; i++) {
            answers[i].textContent = answers[i].textContent.replace("{{Answer" + (i + 1) + "}}", "" + this.answers[i][0]);
            //@ts-ignore value is HTML tag elem
            answers[i].value = "" + this.answers[i][1];
        }
    };
    QuestionsAndAnswers.prototype.onClick = function (e) {
        console.log(e);
    };
    return QuestionsAndAnswers;
}());
var data;
var dataReceive = function () { return data_js_1.getData.then(function (result) { data = result; }); };
dataReceive();
// After data fetching create every Object and run methods on it
setTimeout(function () {
    /*for(let i = 0; i<Object.keys(data).length; i++)
    {
        const newQAndA = QuestionsAndAnswers.create(data[i]);
        console.log(newQAndA);
    }*/
    var randomSet = Math.floor(Math.random() * Object.keys(data).length);
    console.log(data[randomSet]);
    var test = new QuestionsAndAnswers(data[randomSet].question, data[randomSet].answers, data[randomSet].points);
    test.render();
}, 355);
// Query Selectors
var startButton = document.querySelector('.startButton');
var informationsButton = document.querySelector('.informationsButton');
var optionsButton = document.querySelector('.optionsButton');
//@ts-ignore
var inGameViewTemplate = document.getElementById('inGameViewTemplate');
var inGameViewTemplateContent = inGameViewTemplate.content;
/**
 *  Events
 */
startButton.addEventListener('click', function (e) {
    e.preventDefault();
    document.body.innerHTML = '';
    document.body.appendChild(inGameViewTemplateContent);
});
informationsButton.addEventListener('click', function (e) {
    e.preventDefault();
});
optionsButton.addEventListener('click', function (e) {
    e.preventDefault();
});
// On click Quiz answers
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('answer1')) {
        console.log(e.target.value);
    }
    else if (e.target.classList.contains('answer2')) {
        console.log(e.target.value);
    }
    else if (e.target.classList.contains('answer3')) {
        console.log(e.target.value);
    }
    else if (e.target.classList.contains('answer4')) {
        console.log(e.target.value);
    }
});
