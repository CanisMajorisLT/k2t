"use strict";

var statisticFunctions = require("./statistics_calculation_functions-compiled");

//TODO: implamentutoi react interfacus, istestuoti ar attitinka heatmapai ir ktia rodikliai
/**
 * @return {Array} [Object, Object] {textId: str, textLengthInWords: number, WPM: number, mistakesPerWord: number, ...wordsStatisticsCalculator}*/

// keeps order of words
var gameSpecificsStats = exports.gameSpecificsStats = function (statsData) {
    var trimAndClean = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    var statsDataToArray = objectToArray(statsData);

    return statsDataToArray.map(function (oneGameData) {
        var oneGameWPM = statisticFunctions.calculateWPM(oneGameData.startTime, oneGameData.endTime, oneGameData.textLengthInWords);
        var statsFromWordInput = statisticFunctions.wordsStatisticsCalculator(oneGameData.wordStats, trimAndClean = true); //wordsStatisticsCalculator_n

        statsFromWordInput.gameId = oneGameData.gameId;
        statsFromWordInput.textLengthInWords = oneGameData.textLengthInWords;
        statsFromWordInput.WPM = oneGameWPM;
        statsFromWordInput.mistakesPerWord = statsFromWordInput.totalMistakesInText / oneGameData.textLengthInWords;

        return statsFromWordInput;
    });
};

// keeps order of words
var textSpecificStats = exports.textSpecificStats = function (gameSpecificsStats) {
    var groupedByHashes = gameSpecificsStats.reduce(function (accum, current, index, array) {
        var textId_actual = current.gameId.split("-")[0];
        if (!accum.hasOwnProperty(textId_actual)) {
            accum[textId_actual] = [];
        }

        accum[textId_actual].push(current);

        return accum;
    }, {});

    return Object.keys(groupedByHashes).map(function (key) {
        var games = groupedByHashes[key];
        var statsOfSameTexts = { textId: key, gamesCount: games.length, words: wordsSpecificStatsForSameText(games) };
        Object.assign(statsOfSameTexts, overAllStats(games));
        return statsOfSameTexts;
    });
};

/**
 * @param {Array} ArrayOfSameTextGames This is same output as given by gameSpecificsStats, but it has to be for all games of same text.
 * @return {Object} {wordsMap:{[word]: [index], words: [{word: "", count: 0, mistakes: 0, heatMap: [], typingTime: {all: [], fastest: null}}]}}*/
var wordsSpecificStatsForSameText = exports.wordsSpecificStatsForSameText = function (ArrayOfSameTextGames) {
    return ArrayOfSameTextGames.reduce(function (accum, current) {
        current.words.forEach(function (wordObj, index) {
            if (accum.words[index] === undefined) {
                accum.words[index] = {
                    word: wordObj.word,
                    count: 0,
                    mistakes: 0,
                    heatMap: [],
                    typingTime: { all: [], fastest: null }
                };

                accum.wordsMap[wordObj.word] = index;
            }
            var heatMap = wordObj.heatMap;
            accum.words[index].mistakes += wordObj.mistakes;
            accum.words[index].count += 1;
            var FastestTypingTime = accum.words[index].typingTime.fastest;
            if (!FastestTypingTime || FastestTypingTime < wordObj.typingTime) {
                accum.words[index].typingTime.fastest = wordObj.typingTime;
            }
            accum.words[index].typingTime.all.push(wordObj.typingTime);

            if (accum.words[index].heatMap.length === 0) {
                accum.words[index].heatMap = heatMap;
            } else {
                accum.words[index].heatMap.map(function (mistake, indexHeat) {
                    var mistake2 = heatMap[indexHeat];
                    if (!mistake && !mistake2) {
                        return undefined;
                    } else {
                        return mistake + mistake2;
                    }
                });
            }
        });

        return accum;
    }, {
        wordsMap: {},
        words: []
    });
};

/**
 * @param {Array} gameSpecificsStats result of function that has this name
 * @return {Object} {[word]: {count: number, heatMat:[number, number, ...],
 *                           mistakes: number, typingTime: {all:[number, number, ...], fastest: number}}}*/
var wordsSpecificStats = exports.wordsSpecificStats = function (gameSpecificsStats) {
    return gameSpecificsStats.reduce(function (accum, current, index, arr) {
        current.words.forEach(function (wordObj) {
            var word = wordObj.word;
            if (!accum.hasOwnProperty(word)) {
                accum[word] = { count: 0, mistakes: 0, heatMap: [], typingTime: { all: [], fastest: wordObj.typingTime } };
            }

            accum[word].count += 1; //-
            accum[word].mistakes += wordObj.mistakes;
            accum[word].heatMap.map(function (mistake, index) {
                var mistake2 = wordObj.heatMap[index];
                if (!mistake && !mistake2) {
                    return undefined;
                } else {
                    return mistake + mistake2;
                }
            });
            var fastestOld = accum[word].typingTime.fastest;
            var currentSpeed = wordObj.typingTime; //-
            accum[word].typingTime.all.push(currentSpeed); //-
            accum[word].typingTime.fastest = fastestOld < currentSpeed ? fastestOld : currentSpeed; //-
        });
        return accum;
    }, {});
};

/**
 * @return {Object} {WPM: number, totalMistakes: number, MPW: number
 * WPM - word per minute
 * MPW - mistakes per word
 * */
var overAllStats = exports.overAllStats = function (gameSpecificsStats) {
    return gameSpecificsStats.reduce(function (accum, current, index, arr) {

        accum.WPM.push(current.WPM);
        accum.totalMistakes.push(current.totalMistakesInText);
        accum.MPW.push(current.mistakesPerWord);

        if (index === arr.length - 1) {
            accum.WPM = average(accum.WPM);
            accum.totalMistakes = sum(accum.totalMistakes);
            accum.MPW = average(accum.MPW);
        }
        return accum;
    }, { WPM: [], totalMistakes: [], MPW: [] });
};

/**
 * @return {Array} [Object, Object, ...]*/
var objectToArray = function objectToArray(obj) {
    var keys = Object.keys(obj);
    return keys.map(function (key) {
        return JSON.parse(obj[key]);
    });
};

var sum = function sum(arr) {
    return arr.reduce(function (s, a) {
        return s + Number(a);
    }, 0);
};

var average = function average(arr) {
    return sum(arr) / (arr.length || 1);
};

//# sourceMappingURL=comprehensive_statistics-compiled.js.map