import { getData } from './data.js';

interface quizData {
    readonly question: string;
    readonly answers: [];
    readonly points?: number;
    render: () => void;
}

class QuestionsAndAnswers implements quizData {
    question: string;
    answers: [];
    points?: number;


    constructor(question: string, answers: [], points: number) {
        this.question = question;
        this.answers = answers;
        this.points = points;
    }

    render(): void {
        let containerHTML: string = inGameViewTemplate.innerHTML;
        // Replace {{Quiz}}
        document.getElementById('inGameViewTemplate').innerHTML = containerHTML.replace(/{{[A-z]{0,16}}}/g, `${this.question}`);

        const answers = inGameViewTemplateContent.querySelectorAll('#answersButton');
        console.log(answers)
        // Replace all {{Answers}}
        for (let i = 0; i < answers.length; i++) {
            answers[i].textContent = answers[i].textContent.replace(`{{Answer${i + 1}}}`, `${this.answers[i][0]}`);
            //@ts-ignore value is HTML tag elem
            answers[i].value = `${this.answers[i][1]}`;
        }
    }
    onClick(e: Event): void {
        console.log(e);
    }
}

let data;
const dataReceive = () => getData.then(result => { data = result });
dataReceive();
// After data fetching create every Object and run methods on it
setTimeout(() => {
    /*for(let i = 0; i<Object.keys(data).length; i++)
    {
        const newQAndA = QuestionsAndAnswers.create(data[i]); 
        console.log(newQAndA);
    }*/

    const randomSet: number = Math.floor(Math.random() * Object.keys(data).length);
    console.log(data[randomSet])
    const test = new QuestionsAndAnswers(data[randomSet].question, data[randomSet].answers, data[randomSet].points);
    test.render();

}, 355);

// Query Selectors
const startButton: Element = document.querySelector('.startButton');
const informationsButton: Element = document.querySelector('.informationsButton');
const optionsButton: Element = document.querySelector('.optionsButton');


//@ts-ignore
const inGameViewTemplate: HTMLTemplateElement = document.getElementById('inGameViewTemplate');
const inGameViewTemplateContent = inGameViewTemplate.content;
/**
 *  Events
 */
startButton.addEventListener('click', e => {
    e.preventDefault();
    document.body.innerHTML = '';
    document.body.appendChild(inGameViewTemplateContent);
})

informationsButton.addEventListener('click', e => {
    e.preventDefault();
})

optionsButton.addEventListener('click', e => {
    e.preventDefault();
})

// On click Quiz answers
document.addEventListener('click', e => {
    if(e.target.classList.contains('answer1'))
    {
        console.log(e.target.value)
    } else if(e.target.classList.contains('answer2'))
    {
        console.log(e.target.value)
    } else if(e.target.classList.contains('answer3'))
    {
        console.log(e.target.value)
    }else if (e.target.classList.contains('answer4'))
    {
        console.log(e.target.value)
    }

})
