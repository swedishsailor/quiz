import { getData } from './data.js';

interface quizData {
    readonly question: string;
    readonly answers: any[];
    readonly points: number;
    render: (elem: HTMLElement, timeLeft: number) => void;
}

class QuestionsAndAnswers implements quizData {
    question: string;
    answers: any[];
    points: number;

    constructor(question: string, answers: any[], points: number) {
        this.question = question;
        this.answers = answers;
        this.points = points;
    }
    render(HTMLElement: HTMLElement, timeLeft: number): void {
        questionNumber++;
        const newHTML: string = `    
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
    onClick(e: Event): void {
        console.log(e);
    }
}


/**
 * Functions
 */
// After data fetching create every Object and run methods on it
//FIRST RENDER
const randomQuestion = (HTMLElement: HTMLElement): void => {
    data
        ?
        setTimeout(() => {
            /*for(let i = 0; i<Object.keys(data).length; i++)
            {
                const newQAndA = QuestionsAndAnswers.create(data[i]); 
                console.log(newQAndA);
            }*/

            const randomSet: number = Math.floor(Math.random() * Object.keys(data).length);
            console.log(data[randomSet])
            const test = new QuestionsAndAnswers(data[randomSet].question, data[randomSet].answers, data[randomSet].points);
            test.render(HTMLElement, 30)
        }, 155)
        :
        // SetTimeout to avoid maximum call stack size exceed
        setTimeout(() => {
            randomQuestion(HTMLElement);
        }, 200);

}

const countTime = (timeLeft: number): any => {
    // Short if below reduce the number of errors when rendering is not accomplished
    (document.querySelector('#inGameView')
        ?
        this.time = setInterval(() => {
            const declaredTime = timeLeft;
            timeLeft--;
            // IMPORTANT: code below makes the timer NOT rendering random value after the clearInterval()
            if (timeLeft === 30) {
                document.querySelector('#inGameView').querySelector('.timeLeft').innerHTML = `Time left: 30 sec`;
            } else {
                document.querySelector('#inGameView') ? document.querySelector('#inGameView').querySelector('.timeLeft').innerHTML = `Time left: ${timeLeft} sec` : null;
            }

            // Restart timer if time is up
            if (timeLeft <= 0) {
                clearInterval(this.time);
                badAnswer('Time is up');
                playSoundEffect('fail');
                renderNewQuestion();

            } else if (timeLeft <= 5) {
                // If time is <=5 color the text red
                document.querySelector('#inGameView').querySelector('.timeLeft').classList.add('noTime');
            } else if (timeLeft > 5) {
                // If time is > 5 make text color basic
                document.querySelector('#inGameView') ? document.querySelector('#inGameView').querySelector('.timeLeft').classList.remove('noTime') : null;
            }
            return false;
        }, timeLeft * 1000 / timeLeft)
        :
        countTime(timeLeft));
}

const playSoundEffect = (soundName: string): void => {
    const audio: HTMLAudioElement = document.createElement("audio");
    switch (soundName) {
        case 'success': audio.src = './success.mp3';
            break;
        case 'fail': audio.src = './fail.mp3';
            break;
    }
    audio.volume = volume;
    audio.play();
}

const renderNewQuestion = () => {
    const randomSet: number = Math.floor(Math.random() * Object.keys(data).length);
    const newSet = new QuestionsAndAnswers(data[randomSet].question, data[randomSet].answers, data[randomSet].points);
    const time = setTimeout(() => {
        newSet.render(document.getElementById('inGameView'), 30)
        clearInterval(this.time);
        chosenAnswer = false;
        countTime(QUESTION_TIME);
    }, 5 * 1000);
}

const badAnswer = (message: string) => {
    const badChoice: HTMLParagraphElement = document.createElement('p');
    badChoice.classList.add('timeIsUp');
    badChoice.innerHTML = message;
    document.body.insertAdjacentElement('afterend', badChoice);
    setTimeout(() => {
        badChoice.remove();
    }, 5000);
}

// Function which simulate going back in SPA App instead of treating every dynamic component like a first rendering view
const fakeHistoryBack = (window: Window, location: Location): void => {
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
}

const startButtonClick = (e: Event): void => {
    //history.pushState(null,null, `${location.href}quiz`)
    e.preventDefault();
    document.body.innerHTML = '';
    document.body.appendChild(inGameViewTemplateContent);
}

// Constants and IMPORTANT variables
const QUESTION_TIME: number = 30;
const BASIC_URL: string = location.href;
let data: any[];
let chosenAnswer: boolean = false;
let questionNumber: number = 0;
let volume: number = 0.5;
let points: number = 0;

// Query Selectors
const startButton: Element = document.querySelector('.startButton');
const informationsButton: Element = document.querySelector('.informationsButton');
const optionsButton: Element = document.querySelector('.optionsButton');


//@ts-ignore
const inGameViewTemplate: HTMLTemplateElement = document.getElementById('inGameViewTemplate');
const inGameViewTemplateContent: any = inGameViewTemplate.content;
/**
 *  Events
 */
startButton.addEventListener('click', e => {
    fakeHistoryBack(window, location);
    startButtonClick(e);
    //FIRST CHECH IF RENDERING IS ACCOMPLISHED
    const quizRenderingRegex: RegExp = /{{[A-z]{0,16}}}/g;
    const isNotRendered: boolean = quizRenderingRegex.test(document.getElementById('inGameView').innerHTML);
    if(document.getElementById('inGameView') === null){
        window.location.reload();
    }
    if (isNotRendered || !data) {
        document.getElementById('inGameView').innerHTML = `<div class="loadingDiv"><p class="loading">Loading</p><i class="fas fa-cog"></i></div>`;
        setTimeout(() => {

            startButtonClick(e);
        }, 800);
    }
    countTime(QUESTION_TIME);
})

informationsButton.addEventListener('click', e => {
    fakeHistoryBack(window, location);
    e.preventDefault();
    const informations: HTMLParagraphElement = document.createElement('p');
    informations.classList.add('informations');
    informations.innerHTML = 'This Quiz app is ...';
    document.body.innerHTML = '';
    document.body.appendChild(informations);
})

optionsButton.addEventListener('click', e => {
    fakeHistoryBack(window, location);
    e.preventDefault();
    const ul: HTMLUListElement = document.createElement("ul");
    const li: HTMLLIElement = document.createElement("li");
    const header: HTMLHeadElement = document.createElement('h3');
    const soundSlider: HTMLInputElement = document.createElement('input');

    header.innerHTML = 'Options';
    ul.classList.add('optionsUl');
    li.classList.add('optionsLi');
    li.innerHTML = `Sound: ${volume * 100}%`;
    soundSlider.type = 'range';
    soundSlider.min = '1';
    soundSlider.max = '100';
    soundSlider.value = '50';
    soundSlider.classList.add('soundSlider');
    const backgroundColorOpt: any = li.cloneNode(false);
    backgroundColorOpt.innerHTML = 'Background color';
    const questionTime: any = li.cloneNode(false);
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
        let newVolume: string = volume.toString();
        newVolume = soundSlider.value;
        volume = parseInt(newVolume) / 100;
        li.innerHTML = `Sound: ${Math.floor(volume * 100)}%`;
    })
})

// On click Quiz answers
document.addEventListener('click', (e: any) => {
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
            } else if (e.target.value = 'false') {
                playSoundEffect('fail');
                e.target.classList.add('bad');
                for (let i = 0; i < document.querySelectorAll('#answersButton').length; i++) {
                    //@ts-ignore
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

})

/**
 * INIT MAIN
 */
// Dispatch data from database
const dataReceive = (): any => getData.then(result => { data = result });
dataReceive();
randomQuestion(document.getElementById('inGameViewTemplate'));