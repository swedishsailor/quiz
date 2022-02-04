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
        var newHTML = "    \n        <div id=\"inGameView\">\n        <p class=\"timeLeft\"> Time left: " + timeLeft + " sec</p>\n        <h2>Question " + questionNumber + "</h2>\n        <p class=\"question\">" + this.question + "</p>\n        <div class=\"answers\">\n          <div class=\"leftPanel\">\n            <button value=\"" + this.answers[0][1] + "\" class=\"answer1\" id=\"answersButton\">" + this.answers[0][0] + "</button>\n            <button value=\"" + this.answers[1][1] + "\" class=\"answer2\" id=\"answersButton\">" + this.answers[1][0] + "</button>\n          </div>\n          <div class=\"rightPanel\">\n            <button value=\"" + this.answers[2][1] + "\" class=\"answer3\" id=\"answersButton\">" + this.answers[2][0] + "</button>\n            <button value=\"" + this.answers[3][1] + "\" class=\"answer4\" id=\"answersButton\">" + this.answers[3][0] + "</button>\n          </div>\n        </div>\n      </div>";
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
    data
        ?
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
            }, 155)
        :
            // SetTimeout to avoid maximum call stack size exceed
            setTimeout(function () {
                randomQuestion(HTMLElement);
            }, 200);
};
var countTime = function (timeLeft) {
    // Short if below reduce the number of errors when rendering is not accomplished
    (document.querySelector('#inGameView')
        ?
            _this.time = setInterval(function () {
                var declaredTime = timeLeft;
                timeLeft--;
                // IMPORTANT: code below makes the timer NOT rendering random value after the clearInterval()
                if (timeLeft === 30) {
                    document.querySelector('#inGameView').querySelector('.timeLeft').innerHTML = "Time left: 30 sec";
                }
                else {
                    document.querySelector('#inGameView') ? document.querySelector('#inGameView').querySelector('.timeLeft').innerHTML = "Time left: " + timeLeft + " sec" : null;
                }
                // Restart timer if time is up
                if (timeLeft <= 0) {
                    clearInterval(_this.time);
                    badAnswer('Time is up');
                    playSoundEffect('fail');
                    renderNewQuestion();
                }
                else if (timeLeft <= 5) {
                    // If time is <=5 color the text red
                    document.querySelector('#inGameView').querySelector('.timeLeft').classList.add('noTime');
                }
                else if (timeLeft > 5) {
                    // If time is > 5 make text color basic
                    document.querySelector('#inGameView') ? document.querySelector('#inGameView').querySelector('.timeLeft').classList.remove('noTime') : null;
                }
                return false;
            }, timeLeft * 1000 / timeLeft)
        :
            countTime(timeLeft));
};
var playSoundEffect = function (soundName) {
    var audio = document.createElement("audio");
    switch (soundName) {
        case 'success':
            audio.src = './success.mp3';
            break;
        case 'fail':
            audio.src = './fail.mp3';
            break;
    }
    audio.volume = volume;
    audio.play();
};
var renderNewQuestion = function () {
    var randomSet = Math.floor(Math.random() * Object.keys(data).length);
    var newSet = new QuestionsAndAnswers(data[randomSet].question, data[randomSet].answers, data[randomSet].points);
    var time = setTimeout(function () {
        newSet.render(document.getElementById('inGameView'), 30);
        clearInterval(_this.time);
        chosenAnswer = false;
        countTime(QUESTION_TIME);
    }, 5 * 1000);
};
var badAnswer = function (message) {
    var badChoice = document.createElement('p');
    badChoice.classList.add('timeIsUp');
    badChoice.innerHTML = message;
    document.body.insertAdjacentElement('afterend', badChoice);
    setTimeout(function () {
        badChoice.remove();
    }, 5000);
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
var startButtonClick = function (e) {
    //history.pushState(null,null, `${location.href}quiz`)
    e.preventDefault();
    document.body.innerHTML = '';
    document.body.appendChild(inGameViewTemplateContent);
};
// Constants and IMPORTANT variables
var QUESTION_TIME = 30;
var BASIC_URL = location.href;
var data;
var chosenAnswer = false;
var questionNumber = 0;
var volume = 0.5;
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
    fakeHistoryBack(window, location);
    startButtonClick(e);
    //FIRST CHECH IF RENDERING IS ACCOMPLISHED
    var quizRenderingRegex = /{{[A-z]{0,16}}}/g;
    var isNotRendered = quizRenderingRegex.test(document.getElementById('inGameView').innerHTML);
    if (isNotRendered || !data) {
        document.getElementById('inGameView').innerHTML = "<div class=\"loadingDiv\"><p class=\"loading\">Loading</p><i class=\"fas fa-cog\"></i></div>";
        setTimeout(function () {
            startButtonClick(e);
        }, 800);
    }
    countTime(QUESTION_TIME);
});
informationsButton.addEventListener('click', function (e) {
    fakeHistoryBack(window, location);
    e.preventDefault();
    var informations = document.createElement('p');
    informations.classList.add('informations');
    informations.innerHTML = 'This Quiz app is ...';
    document.body.innerHTML = '';
    document.body.appendChild(informations);
});
optionsButton.addEventListener('click', function (e) {
    fakeHistoryBack(window, location);
    e.preventDefault();
    var ul = document.createElement("ul");
    var li = document.createElement("li");
    var header = document.createElement('h3');
    var soundSlider = document.createElement('input');
    header.innerHTML = 'Options';
    ul.classList.add('optionsUl');
    li.classList.add('optionsLi');
    li.innerHTML = "Sound: " + volume * 100 + "%";
    soundSlider.type = 'range';
    soundSlider.min = '1';
    soundSlider.max = '100';
    soundSlider.value = '50';
    soundSlider.classList.add('soundSlider');
    var backgroundColorOpt = li.cloneNode(false);
    backgroundColorOpt.innerHTML = 'Background color';
    var questionTime = li.cloneNode(false);
    questionTime.innerHTML = 'Time for questions';
    header.classList.add('optionsHeader');
    document.body.innerHTML = '';
    document.body.appendChild(header);
    document.body.appendChild(ul);
    ul.appendChild(li);
    ul.appendChild(soundSlider);
    ul.appendChild(backgroundColorOpt);
    ul.appendChild(questionTime);
    soundSlider.addEventListener('change', function () {
        var newVolume = volume.toString();
        newVolume = soundSlider.value;
        volume = parseInt(newVolume) / 100;
        li.innerHTML = "Sound: " + Math.floor(volume * 100) + "%";
    });
});
// On click Quiz answers
document.addEventListener('click', function (e) {
    if (!chosenAnswer) {
        if (e.target.id === "answersButton") {
            chosenAnswer = true;
            if (e.target.value === 'true') {
                var goodChoice_1 = document.createElement('p');
                playSoundEffect('success');
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
                playSoundEffect('fail');
                e.target.classList.add('bad');
                for (var i = 0; i < document.querySelectorAll('#answersButton').length; i++) {
                    //@ts-ignore
                    if (document.querySelectorAll('#answersButton')[i].value === 'true') {
                        document.querySelectorAll('#answersButton')[i].classList.add('correct');
                    }
                }
                badAnswer('Bad answer');
                clearInterval(_this.time);
                countTime(5);
            }
            renderNewQuestion();
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
