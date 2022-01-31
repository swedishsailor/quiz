"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var data_js_1 = require("./data.js");
var QuestionsAndAnswers = /** @class */ (function () {
    function QuestionsAndAnswers() {
    }
    QuestionsAndAnswers.create = function (data) {
        return __assign({}, data);
    };
    QuestionsAndAnswers.prototype.next = function () {
    };
    return QuestionsAndAnswers;
}());
var data;
var dataReceive = function () { return data_js_1.getData.then(function (result) { data = result; }); };
dataReceive();
// After data fetching create every Object and run methods on it
setTimeout(function () {
    for (var i = 0; i < Object.keys(data).length; i++) {
        var newQAndA = QuestionsAndAnswers.create(data[i]);
        console.log(newQAndA);
    }
}, 355);
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
// On click Start Button
startButton.addEventListener('click', function (e) {
    e.preventDefault();
    //const copy = inGameViewTemplateContent.cloneNode(true);
    document.body.innerHTML = '';
    document.body.appendChild(inGameViewTemplateContent);
});
// On click Informations Button
informationsButton.addEventListener('click', function (e) {
    e.preventDefault();
});
// On click Options Button
optionsButton.addEventListener('click', function (e) {
    e.preventDefault();
});
