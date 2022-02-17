import { getData } from './data.js';
class QuestionsAndAnswers {
    question;
    answers;
    points;
    constructor(question, answers, points) {
        this.question = question;
        this.answers = answers;
        this.points = points;
    }
    render(HTMLElement, timeLeft) {
        questionNumber++;
        const newHTML = `    
        <div id="inGameView">
        <p class="timeLeft"> Time left: ${timeLeft} sec</p>
        <p class="points"> Score: <span class="score">${points * 10}</span></p>
        <h2>Question ${questionNumber}</h2>
        <p class="question">${this.question}</p>
        <div class="answers">
          <div class="leftPanel">
            <button value="${this.answers[0][1]}" class="answer1" id="answersButton">${this.answers[0][0]}</button>
            <button value="${this.answers[1][1]}" class="answer2" id="answersButton">${this.answers[1][0]}</button>
          </div>
          <div class="rightPanel">
            <button value="${this.answers[2][1]}" class="answer3" id="answersButton">${this.answers[2][0]}</button>
            <button value="${this.answers[3][1]}" class="answer4" id="answersButton">${this.answers[3][0]}</button>
          </div>
        </div>
      </div>`;
        HTMLElement.innerHTML = newHTML;
    }
    onClick(e) {
        console.log(e);
    }
}
const randomQuestion = (HTMLElement) => {
    data
        ?
            setTimeout(() => {
                const randomSet = Math.floor(Math.random() * Object.keys(data).length);
                console.log(data[randomSet]);
                const test = new QuestionsAndAnswers(data[randomSet].question, data[randomSet].answers, data[randomSet].points);
                test.render(HTMLElement, 30);
            }, 155)
        :
            setTimeout(() => {
                randomQuestion(HTMLElement);
            }, 200);
};
const countTime = (timeLeft) => {
    (document.querySelector('#inGameView')
        ?
            this.time = setInterval(() => {
                const declaredTime = timeLeft;
                timeLeft--;
                if (timeLeft === 30) {
                    document.querySelector('#inGameView').querySelector('.timeLeft').innerHTML = `Time left: 30 sec`;
                }
                else {
                    document.querySelector('#inGameView') ? document.querySelector('#inGameView').querySelector('.timeLeft').innerHTML = `Time left: ${timeLeft} sec` : null;
                }
                if (timeLeft <= 0) {
                    clearInterval(this.time);
                    badAnswer('Time is up');
                    playSoundEffect('fail');
                    renderNewQuestion();
                }
                else if (timeLeft <= 5) {
                    document.querySelector('#inGameView').querySelector('.timeLeft').classList.add('noTime');
                }
                else if (timeLeft > 5) {
                    document.querySelector('#inGameView') ? document.querySelector('#inGameView').querySelector('.timeLeft').classList.remove('noTime') : null;
                }
                return false;
            }, timeLeft * 1000 / timeLeft)
        :
            countTime(timeLeft));
};
const playSoundEffect = (soundName) => {
    const audio = document.createElement("audio");
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
const renderNewQuestion = () => {
    const randomSet = Math.floor(Math.random() * Object.keys(data).length);
    const newSet = new QuestionsAndAnswers(data[randomSet].question, data[randomSet].answers, data[randomSet].points);
    const time = setTimeout(() => {
        newSet.render(document.getElementById('inGameView'), 30);
        clearInterval(this.time);
        chosenAnswer = false;
        countTime(QUESTION_TIME);
    }, 5 * 1000);
};
const badAnswer = (message) => {
    const badChoice = document.createElement('p');
    badChoice.classList.add('timeIsUp');
    badChoice.innerHTML = message;
    document.body.insertAdjacentElement('afterend', badChoice);
    setTimeout(() => {
        badChoice.remove();
    }, 5000);
};
const fakeHistoryBack = (window, location) => {
    history.replaceState(null, document.title, location.pathname + "#!/stealingyourhistory");
    history.pushState(null, document.title, location.pathname);
    window.addEventListener("popstate", () => {
        if (location.hash === "#!/stealingyourhistory") {
            history.replaceState(null, document.title, location.pathname);
            setTimeout(function () {
                location.replace(BASIC_URL);
            }, 0);
        }
    }, false);
};
const startButtonClick = (e) => {
    e.preventDefault();
    document.body.innerHTML = '';
    document.body.appendChild(inGameViewTemplateContent);
};
const QUESTION_TIME = 30;
const BASIC_URL = location.href;
let data;
let chosenAnswer = false;
let questionNumber = 0;
let volume = 0.5;
let points = 0;
const startButton = document.querySelector('.startButton');
const informationsButton = document.querySelector('.informationsButton');
const optionsButton = document.querySelector('.optionsButton');
const inGameViewTemplate = document.getElementById('inGameViewTemplate');
const inGameViewTemplateContent = inGameViewTemplate.content;
startButton.addEventListener('click', e => {
    fakeHistoryBack(window, location);
    startButtonClick(e);
    const quizRenderingRegex = /{{[A-z]{0,16}}}/g;
    const isNotRendered = quizRenderingRegex.test(document.getElementById('inGameView').innerHTML);
    if (document.getElementById('inGameView') === null) {
        window.location.reload();
    }
    if (isNotRendered || !data) {
        document.getElementById('inGameView').innerHTML = `<div class="loadingDiv"><p class="loading">Loading</p><i class="fas fa-cog"></i></div>`;
        setTimeout(() => {
            startButtonClick(e);
        }, 800);
    }
    countTime(QUESTION_TIME);
});
informationsButton.addEventListener('click', e => {
    fakeHistoryBack(window, location);
    e.preventDefault();
    const informations = document.createElement('p');
    informations.classList.add('informations');
    informations.innerHTML = 'This Quiz app is ...';
    document.body.innerHTML = '';
    document.body.appendChild(informations);
});
optionsButton.addEventListener('click', e => {
    fakeHistoryBack(window, location);
    e.preventDefault();
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    const header = document.createElement('h3');
    const soundSlider = document.createElement('input');
    header.innerHTML = 'Options';
    ul.classList.add('optionsUl');
    li.classList.add('optionsLi');
    li.innerHTML = `Sound: ${volume * 100}%`;
    soundSlider.type = 'range';
    soundSlider.min = '1';
    soundSlider.max = '100';
    soundSlider.value = '50';
    soundSlider.classList.add('soundSlider');
    const backgroundColorOpt = li.cloneNode(false);
    backgroundColorOpt.innerHTML = 'Background color';
    const questionTime = li.cloneNode(false);
    questionTime.innerHTML = 'Time for questions';
    header.classList.add('optionsHeader');
    document.body.innerHTML = '';
    document.body.appendChild(header);
    document.body.appendChild(ul);
    ul.appendChild(li);
    ul.appendChild(soundSlider);
    ul.appendChild(backgroundColorOpt);
    ul.appendChild(questionTime);
    soundSlider.addEventListener('change', () => {
        let newVolume = volume.toString();
        newVolume = soundSlider.value;
        volume = parseInt(newVolume) / 100;
        li.innerHTML = `Sound: ${Math.floor(volume * 100)}%`;
    });
});
document.addEventListener('click', (e) => {
    if (!chosenAnswer) {
        if (e.target.id === "answersButton") {
            chosenAnswer = true;
            if (e.target.value === 'true') {
                points += 10;
                const goodChoice = document.createElement('p');
                playSoundEffect('success');
                goodChoice.classList.add('goodAnswer');
                goodChoice.innerHTML = `Good answer!`;
                document.body.insertAdjacentElement('afterend', goodChoice);
                setTimeout(() => {
                    goodChoice.remove();
                }, 5000);
                clearInterval(this.time);
                e.target.classList.add('correct');
                clearInterval(this.time);
                countTime(5);
            }
            else if (e.target.value = 'false') {
                playSoundEffect('fail');
                e.target.classList.add('bad');
                for (let i = 0; i < document.querySelectorAll('#answersButton').length; i++) {
                    if (document.querySelectorAll('#answersButton')[i].value === 'true') {
                        document.querySelectorAll('#answersButton')[i].classList.add('correct');
                    }
                }
                badAnswer('Bad answer');
                clearInterval(this.time);
                countTime(5);
            }
            renderNewQuestion();
        }
    }
});
const dataReceive = () => getData.then(result => { data = result; });
dataReceive();
randomQuestion(document.getElementById('inGameViewTemplate'));
