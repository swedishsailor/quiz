interface Answers {
    question: string;
    answers:string[];
    isCorrect: boolean;
    points?: number;
}

class QuestionsAndAnswers {
    static create(data:Answers){
        return {question: data.question, answers: data.answers, isCorrect: data.isCorrect, points: data.points};
    }    
    next():void{

    }
}

const testQAndA = QuestionsAndAnswers.create({question :'north america', answers:['lul', 'essalysoly'], isCorrect:true, points:20});

console.log(testQAndA);

// Query Selectors
const startButton:Element = document.querySelector('.startButton');
const informationsButton:Element = document.querySelector('.informationsButton');
const optionsButton:Element = document.querySelector('.optionsButton');

const inGameViewTemplate:HTMLTemplateElement = document.getElementById('inGameViewTemplate');
const inGameViewTemplateContent = inGameViewTemplate.content;
// On click Start Button
startButton.addEventListener('click', (e) => {
    e.preventDefault();
    //const copy = inGameViewTemplateContent.cloneNode(true);
    document.body.innerHTML = '';
    document.body.appendChild(inGameViewTemplateContent);
})
