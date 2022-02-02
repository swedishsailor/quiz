"use strict";
var _this = this;
exports.__esModule = true;
var data_js_1 = require("./data.js");
var QuestionsAndAnswers = /** @class */ (function () {
    function QuestionsAndAnswers(question, answers, points) {
        this.question = question;
        this.answers = answers;
        this.points = points;
    }
    QuestionsAndAnswers.prototype.render = function (HTMLElement, timeLeft) {
        questionNumber++;
        var newHTML = "    \n        <div id=\"inGameView\">\n        <p class=\"timeLeft\"> Time left: ".concat(timeLeft, " sec</p>\n        <h2>Question ").concat(questionNumber, "</h2>\n        <p class=\"question\">").concat(this.question, "</p>\n        <div class=\"answers\">\n          <div class=\"leftPanel\">\n            <button value=\"").concat(this.answers[0][1], "\" class=\"answer1\" id=\"answersButton\">").concat(this.answers[0][0], "</button>\n            <button value=\"").concat(this.answers[1][1], "\" class=\"answer2\" id=\"answersButton\">").concat(this.answers[1][0], "</button>\n          </div>\n          <div class=\"rightPanel\">\n            <button value=\"").concat(this.answers[2][1], "\" class=\"answer3\" id=\"answersButton\">").concat(this.answers[2][0], "</button>\n            <button value=\"").concat(this.answers[3][1], "\" class=\"answer4\" id=\"answersButton\">").concat(this.answers[3][0], "</button>\n          </div>\n        </div>\n      </div>");
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
//FIRST RENDER
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
    }, 155);
};
var countTime = function (timeLeft) {
    _this.time = setInterval(function () {
        var declaredTime = timeLeft;
        timeLeft--;
        // IMPORTANT: code below makes the timer NOT rendering random value after the clearInterval()
        if (timeLeft === 30) {
            document.querySelector('#inGameView').querySelector('.timeLeft').innerHTML = "Time left: 30 sec";
        }
        else {
            document.querySelector('#inGameView').querySelector('.timeLeft').innerHTML = "Time left: ".concat(timeLeft, " sec");
        }
        // Restart timer if time is up
        if (timeLeft <= 0) {
            clearInterval(_this.time);
            countTime(QUESTION_TIME);
        }
        else if (timeLeft <= 5) {
            // If time is <=5 color the text red
            document.querySelector('#inGameView').querySelector('.timeLeft').classList.add('noTime');
        }
        else if (timeLeft > 5) {
            // If time is > 5 make text color basic
            document.querySelector('#inGameView').querySelector('.timeLeft').classList.remove('noTime');
        }
        return false;
    }, timeLeft * 1000 / timeLeft);
};
// Function which simulate going back in SPA App instead of treating every dynamic component like a first rendering view
var fakeHistoryBack = function (window, location) {
    history.replaceState(null, document.title, location.pathname + "#!/stealingyourhistory");
    history.pushState(null, document.title, location.pathname);
    window.addEventListener("popstate", function () {
        if (location.hash === "#!/stealingyourhistory") {
            history.replaceState(null, document.title, location.pathname);
            setTimeout(function () {
                location.replace(BASIC_URL);
            }, 0);
        }
    }, false);
};
// Constants and IMPORTANT variables
var QUESTION_TIME = 30;
var BASIC_URL = location.href;
var data;
var chosenAnswer = false;
var questionNumber = 0;
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
    //history.pushState(null,null, `${location.href}quiz`)
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
    console.log(location.href);
    //FIRST CHECH IF RENDERING IS ACCOMPLISHED
    var quizRenderingRegex = /{{[A-z]{0,16}}}/g;
    console.log('Rendered set ', quizRenderingRegex.test(document.getElementById('inGameView').innerHTML));
    if (!chosenAnswer) {
        if (e.target.id === "answersButton") {
            chosenAnswer = true;
            console.log(e.target.value);
            if (e.target.value === 'true') {
                var goodChoice_1 = document.createElement('p');
                goodChoice_1.classList.add('goodAnswer');
                goodChoice_1.innerHTML = "Good answer!";
                document.body.insertAdjacentElement('afterend', goodChoice_1);
                setTimeout(function () {
                    goodChoice_1.remove();
                }, 5000);
                clearInterval(_this.time);
                e.target.classList.add('correct');
                clearInterval(_this.time);
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
                var badChoice_1 = document.createElement('p');
                badChoice_1.classList.add('timeIsUp');
                badChoice_1.innerHTML = "Bad answer";
                document.body.insertAdjacentElement('afterend', badChoice_1);
                setTimeout(function () {
                    badChoice_1.remove();
                }, 5000);
                clearInterval(_this.time);
                countTime(5);
            }
            var randomSet = Math.floor(Math.random() * Object.keys(data).length);
            var newSet_1 = new QuestionsAndAnswers(data[randomSet].question, data[randomSet].answers, data[randomSet].points);
            var time = setTimeout(function () {
                newSet_1.render(document.getElementById('inGameView'), 30);
                clearInterval(_this.time);
                chosenAnswer = false;
                countTime(QUESTION_TIME);
            }, 5 * 1000);
        }
    }
});
/**
 * INIT MAIN
 */
// Dispatch data from database
var dataReceive = function () { return data_js_1.getData.then(function (result) { data = result; }); };
dataReceive();
randomQuestion(document.getElementById('inGameViewTemplate'));
fakeHistoryBack(window, location);
