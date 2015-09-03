/*
 let statisticsForText = {
 textId,
 typingStartTime,
 typingFinishTime,
 misstakes,
 fastestWord,
 slowestWord
 };
 let statisticForWord = {
 word,
 avgTypingTime,
 slowestTypingTime,
 fastestTypingTime,
 indexWhereMisstakeStarted // tada butu galima daryt kaip heatmapa zodziais ir matyt kur dazniausiai prasideda klaida

 };*/

"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StatsObj = function StatsObj(textData) {
    _classCallCheck(this, StatsObj);

    this.gameId = textData.gameId;
    this.textLengthInWords = textData.lengthInWords;
    this.startTime = Date.now();
    this.endTime = null;
    this.wordStats = [];
}

// TODO parasyt su karma testus
;

function getStatsObj(textData) {
    var statsFromLocal = window.localStorage.getItem(textData.gameId);
    if (statsFromLocal) {
        return JSON.parse(statsFromLocal);
    } else {
        var stats = new StatsObj(textData);
        window.localStorage.setItem(textData.gameId, JSON.stringify(stats));
        return stats;
    }
}

var recordStatistic = module.exports = function (inputResult, textData) {
    var statsObj = getStatsObj(textData);
    var oneWordStatCont = statsObj.wordStats[textData.currentWord];
    var wordStats = undefined;
    if (oneWordStatCont !== undefined) {
        wordStats = oneWordStatCont;
    } else {
        statsObj.wordStats[textData.currentWord] = [];
        wordStats = statsObj.wordStats[textData.currentWord];
    }
    wordStats.push(inputResult);

    if (textData.currentWord + 1 === textData.lengthInWords) {
        statsObj.endTime = Date.now();
    }
    //console.log('wordStats', wordStats);

    window.localStorage.setItem(textData.gameId, JSON.stringify(statsObj));
};

//# sourceMappingURL=record_statistics-compiled.js.map