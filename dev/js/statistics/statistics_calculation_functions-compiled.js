/**
 * Created by vyt on 2015-08-11.
 */
"use strict";

var trimAndRemoveSigns = require("../utils").trimAndRemoveSigns;

var calculateWPM = exports.calculateWPM = function (startTime, finishTime, textLengthInWords) {
    if (!startTime || !finishTime || !textLengthInWords) {
        return 0;
    }
    return textLengthInWords / ((finishTime - startTime) / 1000) * 60;
};

/**@param {object) wordsStatsArray from StatsObj.wordStats
 * @return {object} {totalMistakesInText: 0, words: {word(str): {count: 0, mistakes: 0, heatMap: [], typingTime: {all: [], fastest: null}}}}*/
var wordsStatisticsCalculator_deprected = exports.wordsStatisticsCalculator_deprected = function (wordsStatsArray) {
    var trimAndClean = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    return wordsStatsArray.map(function (singleWordStatsArray) {
        return singleWordStats(singleWordStatsArray, trimAndClean = true);
    }).reduce(function (accumulated, eachTextWordStatsObject) {
        var word = eachTextWordStatsObject.word;
        var heatMap = eachTextWordStatsObject.heatMap;
        var tempTotalMistakesInText = accumulated.totalMistakesInText + eachTextWordStatsObject.mistakes;
        if (!accumulated.words.hasOwnProperty(word)) {
            accumulated.words[word] = { count: 0, mistakes: 0, heatMap: [], typingTime: { all: [], fastest: null } };
        }

        accumulated.words[word].mistakes += eachTextWordStatsObject.mistakes;
        accumulated.words[word].count += 1;
        var FastestTypingTime = accumulated.words[word].typingTime.fastest;
        if (!FastestTypingTime || FastestTypingTime < eachTextWordStatsObject.typingTime) {
            accumulated.words[word].typingTime.fastest = eachTextWordStatsObject.typingTime;
        }
        accumulated.words[word].typingTime.all.push(eachTextWordStatsObject.typingTime);

        if (accumulated.words[word].heatMap.length === 0) {
            accumulated.words[word].heatMap = heatMap;
        } else {
            accumulated.words[word].heatMap.map(function (mistake, index) {
                var mistake2 = heatMap[index];
                if (!mistake && !mistake2) {
                    return undefined;
                } else {
                    return mistake + mistake2;
                }
            });
        }

        return { totalMistakesInText: tempTotalMistakesInText, words: accumulated.words };
    }, { totalMistakesInText: 0, words: {} });
};

/**@param {object) wordsStatsArray from StatsObj.wordStats
 * @return {object} {totalMistakesInText: 0, words: [singleWordStats, singleWordStats, {object} {word: str, mistakes: number, heatMap: [], typingTime: number}]}*/
var wordsStatisticsCalculator = exports.wordsStatisticsCalculator = function (wordsStatsArray) {
    var trimAndClean = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    //TODO: prpalesti jsona, ideti mistakes mapa, word mapa
    return wordsStatsArray.map(function (singleWordStatsArray) {
        return singleWordStats(singleWordStatsArray, trimAndClean = true);
    }).reduce(function (accumulated, eachTextWordStatsObject) {
        var tempTotalMistakesInText = accumulated.totalMistakesInText + eachTextWordStatsObject.mistakes;
        accumulated.words.push(eachTextWordStatsObject);
        return { totalMistakesInText: tempTotalMistakesInText, words: accumulated.words };
    }, { totalMistakesInText: 0, words: [] });
};

/**
 * @return {object} {word: str, mistakes: number, heatMap: [], typingTime: number}
 * */
var singleWordStats = exports.singleWordStats = function (singleWordArray) {
    var trimAndClean = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    return singleWordArray.reduce(function (accumulated, currentWordStatsObj, index, array) {
        var word = trimAndClean ? trimAndRemoveSigns(currentWordStatsObj.word) : currentWordStatsObj.word;
        if (!accumulated.word) {
            accumulated.word = word;
        }
        if (accumulated.heatMap.length === 0) {
            accumulated.heatMap = new Array(word.length);
        }

        if (currentWordStatsObj.matches === false) {
            ++accumulated.mistakes;

            var heatMapCoord = accumulated.heatMap[currentWordStatsObj.input.length - 1];
            if (!heatMapCoord) {
                accumulated.heatMap[currentWordStatsObj.input.length - 1] = 1;
            } else {
                ++accumulated.heatMap[currentWordStatsObj.input.length - 1];
            }
        }
        if (index === 0) {
            accumulated.typingTime.tempStart = currentWordStatsObj.time;
        }
        if (index === array.length - 1) {
            var start = accumulated.typingTime.tempStart;
            accumulated.typingTime = currentWordStatsObj.time - start;
        }

        return accumulated;
    }, { word: null, mistakes: 0, heatMap: [], typingTime: { tempStart: 0, tempEnd: 0 } });
};

//# sourceMappingURL=statistics_calculation_functions-compiled.js.map