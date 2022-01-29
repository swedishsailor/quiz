interface Answers {
    content: string;
    isCorrect: boolean;
    points?: number;
}


const testAnswer:Answers = {
    content: 'south aftica',
    isCorrect: true,
    points: 10
}

console.log(testAnswer);

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
