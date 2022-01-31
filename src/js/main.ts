import {getData} from './data.js';

interface quizData {
    readonly question: string;
    readonly answers:[
        [content:string, isCorrect:boolean],
        [content:string, isCorrect:boolean],
        [content:string, isCorrect:boolean],
        [content:string, isCorrect:boolean]
    ];
    readonly points?: number;
}

class QuestionsAndAnswers {
    static create(data:quizData){
        return {...data};
    }    
    next():void{

    }
}

let data;
const dataReceive = () => getData.then(result => {data = result});
dataReceive();
// After data fetching create every Object and run methods on it
setTimeout(() => {
    for(let i = 0; i<Object.keys(data).length; i++)
    {
        const newQAndA = QuestionsAndAnswers.create(data[i]); 
        console.log(newQAndA);
    }
}, 355);

// Query Selectors
const startButton:Element = document.querySelector('.startButton');
const informationsButton:Element = document.querySelector('.informationsButton');
const optionsButton:Element = document.querySelector('.optionsButton');

//@ts-ignore
const inGameViewTemplate:HTMLTemplateElement = document.getElementById('inGameViewTemplate');
const inGameViewTemplateContent = inGameViewTemplate.content;
/**
 *  Events
 */
// On click Start Button
startButton.addEventListener('click', (e) => {
    e.preventDefault();
    //const copy = inGameViewTemplateContent.cloneNode(true);
    document.body.innerHTML = '';
    document.body.appendChild(inGameViewTemplateContent);
})

// On click Informations Button
informationsButton.addEventListener('click', e => {
 e.preventDefault();
})

// On click Options Button
optionsButton.addEventListener('click', e => {
    e.preventDefault();
})