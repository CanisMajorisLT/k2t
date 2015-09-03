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


class StatsObj {
    constructor(textData) {
        this.gameId = textData.gameId;
        this.textLengthInWords = textData.lengthInWords;
        this.startTime = Date.now();
        this.endTime = null;
        this.wordStats = []

    }
}


// TODO parasyt su karma testus
function getStatsObj(textData) {
    let statsFromLocal = window.localStorage.getItem(textData.gameId);
    if (statsFromLocal) {
        return JSON.parse(statsFromLocal)
    }
    else {
        let stats = new StatsObj(textData);
        window.localStorage.setItem(textData.gameId, JSON.stringify(stats));
        return stats
    }

}

let recordStatistic = module.exports = function (inputResult, textData) {
    let statsObj = getStatsObj(textData);
    var oneWordStatCont = statsObj.wordStats[textData.currentWord];
    let wordStats;
    if (oneWordStatCont !== undefined) {
        wordStats = oneWordStatCont
    }
    else {
        statsObj.wordStats[textData.currentWord] = [];
        wordStats = statsObj.wordStats[textData.currentWord]
    }
    wordStats.push(inputResult);

    if (textData.currentWord + 1 === textData.lengthInWords) {
        statsObj.endTime = Date.now()
    }
    //console.log('wordStats', wordStats);

    window.localStorage.setItem(textData.gameId, JSON.stringify(statsObj))
};

