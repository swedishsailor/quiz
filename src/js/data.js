"use strict";
exports.__esModule = true;
exports.getData = void 0;
var axios_1 = require("axios");
var url = "https://quiz-jsonserver.herokuapp.com";
var importedData;
exports.getData = axios_1["default"].get(url + '/qa')
    .then(function (response) {
    importedData = response.data;
    console.log(importedData);
    return response.data;
})["catch"](function (error) { return console.log(error); });
