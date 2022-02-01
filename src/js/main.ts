import { getData } from './data.js';

interface quizData {
    readonly question: string;
    readonly answers: any[];
    readonly points?: number;
    render: (elem: HTMLElement, timeLeft: number) => void;
}

class QuestionsAndAnswers implements quizData {
    question: string;
    answers: any[];
    points?: number;

    constructor(question: string, answers: any[], points: number) {
        this.question = question;
        this.answers = answers;
        this.points = points;
    }
    render(HTMLElement: HTMLElement, timeLeft: number): void {
        const newHTML: string = `    
        <div id="inGameView">
        <p class="timeLeft"> Time left: ${timeLeft} sec</p>
        <h2>Question</h2>
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
      </div>`
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
const randomQuestion = (HTMLElement: HTMLElement): void => {
    setTimeout(() => {
        /*for(let i = 0; i<Object.keys(data).length; i++)
        {
            const newQAndA = QuestionsAndAnswers.create(data[i]); 
            console.log(newQAndA);
        }*/
        const randomSet: number = Math.floor(Math.random() * Object.keys(data).length);
        console.log(data[randomSet])
        const test = new QuestionsAndAnswers(data[randomSet].question, data[randomSet].answers, data[randomSet].points);
        test.render(HTMLElement, 30);
    }, 355);
}

const countTime = (timeLeft: number):any => {
    const time = setInterval(() => {
        console.log(timeLeft)
        timeLeft--;
        document.querySelector('#inGameView').querySelector('.timeLeft').innerHTML = `Time left: ${timeLeft} sec`;
        if (timeLeft <= 0) {
            clearInterval(time);
            return true;
        }
        return false;
    }, timeLeft * 1000 / 30)
}

// Constants and IMPORTANT vars
let data: any[];
const QUESTION_TIME: number = 30;

// Query Selectors
const startButton: Element = document.querySelector('.startButton');
const informationsButton: Element = document.querySelector('.informationsButton');
const optionsButton: Element = document.querySelector('.optionsButton');


//@ts-ignore
const inGameViewTemplate: HTMLTemplateElement = document.getElementById('inGameViewTemplate');
const inGameViewTemplateContent = inGameViewTemplate.content;
const inGameViewCopy = inGameViewTemplate;
/**
 *  Events
 */
startButton.addEventListener('click', e => {
    e.preventDefault();
    document.body.innerHTML = '';
    document.body.appendChild(inGameViewTemplateContent);
    countTime(QUESTION_TIME);
})

informationsButton.addEventListener('click', e => {
    e.preventDefault();
})

optionsButton.addEventListener('click', e => {
    e.preventDefault();
})

// On click Quiz answers
document.addEventListener('click', (e: any) => {
    if (e.target.id === "answersButton") {
        console.log(e.target.value)
        if (e.target.value === 'true') {
            e.target.classList.add('correct');
            countTime(5);
        } else if (e.target.value = 'false') {
            e.target.classList.add('bad');
            for (let i = 0; i < document.querySelectorAll('#answersButton').length; i++) {
                //@ts-ignore
                if (document.querySelectorAll('#answersButton')[i].value === 'true') {
                    document.querySelectorAll('#answersButton')[i].classList.add('correct');
                }
            }
            countTime(5);
        }

        const randomSet: number = Math.floor(Math.random() * Object.keys(data).length);
        const newSet = new QuestionsAndAnswers(data[randomSet].question, data[randomSet].answers, data[randomSet].points);
        const time = setTimeout(() => {
            newSet.render(document.getElementById('inGameView'), 5)
            countTime(QUESTION_TIME);
        }, 5 * 1000);
    }
})

/**
 * INIT MAIN
 */
const dataReceive = () => getData.then(result => { data = result });
dataReceive();

randomQuestion(document.getElementById('inGameViewTemplate'));
