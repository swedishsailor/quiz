"use strict";
exports.__esModule = true;
exports.getData = void 0;
var axios_1 = require("axios");
var url = "https://quiz-jsonserver.herokuapp.com";
exports.getData = axios_1["default"].get(url + '/qa')
    .then(function (response) {
    console.log('Fetched Data :', response.data);
    return response.data;
})["catch"](function (error) { return console.log(error); });
