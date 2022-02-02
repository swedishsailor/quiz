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
        questionNumber++;
        const newHTML: string = `    
        <div id="inGameView">
        <p class="timeLeft"> Time left: ${timeLeft} sec</p>
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
    }, 155);
}

const countTime = (timeLeft: number): any => {
    this.time = setInterval(() => {
        const declaredTime = timeLeft;
        timeLeft--;
        // IMPORTANT: code below makes the timer NOT rendering random value after the clearInterval()
        if (timeLeft === 30) {
            document.querySelector('#inGameView').querySelector('.timeLeft').innerHTML = `Time left: 30 sec`;
        } else {
            document.querySelector('#inGameView').querySelector('.timeLeft').innerHTML = `Time left: ${timeLeft} sec`;
        }

        // Restart timer if time is up
        if (timeLeft <= 0) {
            clearInterval(this.time);
            countTime(QUESTION_TIME);
        } else if (timeLeft <= 5) {
            // If time is <=5 color the text red
            document.querySelector('#inGameView').querySelector('.timeLeft').classList.add('noTime');
        } else if (timeLeft > 5) {
            // If time is > 5 make text color basic
            document.querySelector('#inGameView').querySelector('.timeLeft').classList.remove('noTime');
        }
        return false;
    }, timeLeft * 1000 / timeLeft)
}

// Function which simulate going back in SPA App instead of treating every dynamic component like a first rendering view
const fakeHistoryBack = (window:Window, location:Location):void => {
    history.replaceState(null, document.title, location.pathname+"#!/stealingyourhistory");
    history.pushState(null, document.title, location.pathname);

    window.addEventListener("popstate", () => {
      if(location.hash === "#!/stealingyourhistory") {
            history.replaceState(null, document.title, location.pathname);
            setTimeout(function(){
              location.replace(BASIC_URL);
            },0);
      }
    }, false);
}

// Constants and IMPORTANT variables
const QUESTION_TIME: number = 30;
const BASIC_URL:string = location.href;
let data: any[];
let chosenAnswer:boolean = false;
let questionNumber:number = 0;

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
    //history.pushState(null,null, `${location.href}quiz`)
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
    console.log(location.href)
    //FIRST CHECH IF RENDERING IS ACCOMPLISHED
    const quizRenderingRegex:RegExp = /{{[A-z]{0,16}}}/g;
    console.log('Rendered set ',quizRenderingRegex.test(document.getElementById('inGameView').innerHTML))
    if (!chosenAnswer) {
        if (e.target.id === "answersButton") {
            chosenAnswer = true;
            console.log(e.target.value)
            if (e.target.value === 'true') {
                const goodChoice = document.createElement('p');
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
                e.target.classList.add('bad');
                for (let i = 0; i < document.querySelectorAll('#answersButton').length; i++) {
                    //@ts-ignore
                    if (document.querySelectorAll('#answersButton')[i].value === 'true') {
                        document.querySelectorAll('#answersButton')[i].classList.add('correct');
                    }
                }
                const badChoice = document.createElement('p');
                badChoice.classList.add('timeIsUp');
                badChoice.innerHTML = `Bad answer`;
                document.body.insertAdjacentElement('afterend', badChoice);
                setTimeout(() => {
                    badChoice.remove();
                }, 5000);
                clearInterval(this.time);
                countTime(5);
            }

            const randomSet: number = Math.floor(Math.random() * Object.keys(data).length);
            const newSet = new QuestionsAndAnswers(data[randomSet].question, data[randomSet].answers, data[randomSet].points);
            const time = setTimeout(() => {
                newSet.render(document.getElementById('inGameView'), 30)
                clearInterval(this.time);
                chosenAnswer = false;
                countTime(QUESTION_TIME);
            }, 5 * 1000);
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
fakeHistoryBack(window,location);