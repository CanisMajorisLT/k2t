/**
 * Created by vyt on 2015-08-11.
 */
"use strict";

var localstr = require("../../../test/utils/localstorageoutput");

var oneTextInputData = JSON.parse('{"textId":"fb47f3c56e89118dc79dea92bdca31a7-1439310680848","startTime":1439310682411,"endTime":1439310698557,"wordStats":[[{"word":"Gana ","input":"G","matches":true,"allWord":false,"time":1439310682411},{"word":"Gana ","input":"Ga","matches":true,"allWord":false,"time":1439310682825},{"word":"Gana ","input":"Gan","matches":true,"allWord":false,"time":1439310683053},{"word":"Gana ","input":"Gana","matches":true,"allWord":false,"time":1439310683220},{"word":"Gana ","input":"Gana ","matches":true,"allWord":true,"time":1439310683464}],[{"word":"nyblogas ","input":"n","matches":true,"allWord":false,"time":1439310685660},{"word":"nyblogas ","input":"ni","matches":false,"allWord":false,"time":1439310686639},{"word":"nyblogas ","input":"nib","matches":false,"allWord":false,"time":1439310686942},{"word":"nyblogas ","input":"nibl","matches":false,"allWord":false,"time":1439310687047},{"word":"nyblogas ","input":"niblo","matches":false,"allWord":false,"time":1439310687197},{"word":"nyblogas ","input":"nibl","matches":false,"allWord":false,"time":1439310687440},{"word":"nyblogas ","input":"nib","matches":false,"allWord":false,"time":1439310687625},{"word":"nyblogas ","input":"ni","matches":false,"allWord":false,"time":1439310687975},{"word":"nyblogas ","input":"n","matches":true,"allWord":false,"time":1439310688313},{"word":"nyblogas ","input":"ny","matches":true,"allWord":false,"time":1439310688950},{"word":"nyblogas ","input":"nyg","matches":false,"allWord":false,"time":1439310689129},{"word":"nyblogas ","input":"ny","matches":true,"allWord":false,"time":1439310689561},{"word":"nyblogas ","input":"nyb","matches":true,"allWord":false,"time":1439310689708},{"word":"nyblogas ","input":"nybl","matches":true,"allWord":false,"time":1439310689911},{"word":"nyblogas ","input":"nyblo","matches":true,"allWord":false,"time":1439310690207},{"word":"nyblogas ","input":"nyblog","matches":true,"allWord":false,"time":1439310690317},{"word":"nyblogas ","input":"nyblogS","matches":false,"allWord":false,"time":1439310690626},{"word":"nyblogas ","input":"nyblog","matches":true,"allWord":false,"time":1439310691033},{"word":"nyblogas ","input":"nyblogA","matches":false,"allWord":false,"time":1439310691644},{"word":"nyblogas ","input":"nyblogAS","matches":false,"allWord":false,"time":1439310691707},{"word":"nyblogas ","input":"nyblogAS ","matches":false,"allWord":true,"time":1439310691982},{"word":"nyblogas ","input":"nyblogAS","matches":false,"allWord":false,"time":1439310692304},{"word":"nyblogas ","input":"nyblogA","matches":false,"allWord":false,"time":1439310692423},{"word":"nyblogas ","input":"nyblog","matches":true,"allWord":false,"time":1439310693034},{"word":"nyblogas ","input":"nybloga","matches":true,"allWord":false,"time":1439310693369},{"word":"nyblogas ","input":"nyblogas","matches":true,"allWord":false,"time":1439310693545},{"word":"nyblogas ","input":"nyblogas ","matches":true,"allWord":true,"time":1439310693969}],[{"word":"tekstuks, ","input":"t","matches":true,"allWord":false,"time":1439310694461},{"word":"tekstuks, ","input":"te","matches":true,"allWord":false,"time":1439310694749},{"word":"tekstuks, ","input":"tek","matches":true,"allWord":false,"time":1439310694876},{"word":"tekstuks, ","input":"teks","matches":true,"allWord":false,"time":1439310695009},{"word":"tekstuks, ","input":"tekst","matches":true,"allWord":false,"time":1439310695286},{"word":"tekstuks, ","input":"tekstu","matches":true,"allWord":false,"time":1439310695420},{"word":"tekstuks, ","input":"tekstuk","matches":true,"allWord":false,"time":1439310696206},{"word":"tekstuks, ","input":"tekstuks","matches":true,"allWord":false,"time":1439310696301},{"word":"tekstuks, ","input":"tekstuks,","matches":true,"allWord":false,"time":1439310696590},{"word":"tekstuks, ","input":"tekstuks, ","matches":true,"allWord":true,"time":1439310696787}],[{"word":"okei?","input":"o","matches":true,"allWord":false,"time":1439310697807},{"word":"okei?","input":"ok","matches":true,"allWord":false,"time":1439310697987},{"word":"okei?","input":"oke","matches":true,"allWord":false,"time":1439310698060},{"word":"okei?","input":"okei","matches":true,"allWord":false,"time":1439310698129},{"word":"okei?","input":"okei?","matches":true,"allWord":true,"time":1439310698557}]]}');
var oneTextWordsData = oneTextInputData.wordStats;

var twoTextInputData = JSON.parse(localstr.textTwo);
var twoTextWordsData = twoTextInputData.wordStats;

var threeTextInputData = JSON.parse(localstr.textThree);
var threeTextWordsData = threeTextInputData.wordStats;

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

var trimAndRemoveSigns = function trimAndRemoveSigns(word) {
    var signsToBeRemoved = [",", ".", ";", ":", "(", ")", "!"];
    var newWord = word.trim();
    return newWord.split("").map(function (letter) {
        if (signsToBeRemoved.indexOf(letter) !== -1) {
            return "";
        }
        return letter;
    }).join("");
};

//wordsStatisticsCalculator(twoTextWordsData);
//wordsStatisticsCalculator(threeTextWordsData);

//# sourceMappingURL=statistics_calculation_functions-compiled.js.map