var testAnswer = {
    content: 'south aftica',
    isCorrect: true,
    points: 10
};
console.log(testAnswer);
// Query Selectors
var startButton = document.querySelector('.startButton');
var informationsButton = document.querySelector('.informationsButton');
var optionsButton = document.querySelector('.optionsButton');
var inGameViewTemplate = document.getElementById('inGameViewTemplate');
var inGameViewTemplateContent = inGameViewTemplate.content;
// On click Start Button
startButton.addEventListener('click', function (e) {
    e.preventDefault();
    //const copy = inGameViewTemplateContent.cloneNode(true);
    document.body.innerHTML = '';
    document.body.appendChild(inGameViewTemplateContent);
});
