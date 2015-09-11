let statisticFunctions = require("./statistics_calculation_functions-compiled");

//TODO: implamentutoi react interfacus, istestuoti ar attitinka heatmapai ir ktia rodikliai
/**
 * @return {Array} [Object, Object] {textId: str, textLengthInWords: number, WPM: number, mistakesPerWord: number, ...wordsStatisticsCalculator}*/

// keeps order of words
let gameSpecificsStats = exports.gameSpecificsStats = (statsData, trimAndClean = true) => {
    var statsDataToArray = objectToArray(statsData);

    return statsDataToArray.map((oneGameData)=> {
        let oneGameWPM = statisticFunctions.calculateWPM(oneGameData.startTime, oneGameData.endTime, oneGameData.textLengthInWords);
        let statsFromWordInput = statisticFunctions.wordsStatisticsCalculator(oneGameData.wordStats, trimAndClean = true); //wordsStatisticsCalculator_n

        statsFromWordInput.gameId = oneGameData.gameId;
        statsFromWordInput.textLengthInWords = oneGameData.textLengthInWords;
        statsFromWordInput.WPM = oneGameWPM;
        statsFromWordInput.mistakesPerWord = statsFromWordInput.totalMistakesInText / oneGameData.textLengthInWords;

        return statsFromWordInput
    })
};

// keeps order of words
let textSpecificStats = exports.textSpecificStats = (gameSpecificsStats) => {
    let groupedByHashes = gameSpecificsStats.reduce((accum, current, index, array)=> {
        let textId_actual = current.gameId.split("-")[0];
        if (!accum.hasOwnProperty(textId_actual)) {
            accum[textId_actual] = [];
        }

        accum[textId_actual].push(current);

        return accum
    }, {});

    return Object.keys(groupedByHashes).map((key)=> {
        let games = groupedByHashes[key];
        let statsOfSameTexts = {textId: key, gamesCount: games.length, words: wordsSpecificStatsForSameText(games)};
        Object.assign(statsOfSameTexts, overAllStats(games));
        return statsOfSameTexts
    })
};

/**
 * @param {Array} ArrayOfSameTextGames This is same output as given by gameSpecificsStats, but it has to be for all games of same text.
 * @return {Object} {wordsMap:{[word]: [index], words: [{word: "", count: 0, mistakes: 0, heatMap: [], typingTime: {all: [], fastest: null}}]}}*/
let wordsSpecificStatsForSameText = exports.wordsSpecificStatsForSameText = (ArrayOfSameTextGames)=> {
    return ArrayOfSameTextGames.reduce((accum, current)=> {
        current.words.forEach((wordObj, index)=> {
            if (accum.words[index] === undefined) {
                accum.words[index] = {
                    word: wordObj.word,
                    count: 0,
                    mistakes: 0,
                    heatMap: [],
                    typingTime: {all: [], fastest: null}
                };

                accum.wordsMap[wordObj.word] = index
            }
            let heatMap = wordObj.heatMap;
            accum.words[index].mistakes += wordObj.mistakes;
            accum.words[index].count += 1;
            let FastestTypingTime = accum.words[index].typingTime.fastest;
            if (!FastestTypingTime || FastestTypingTime < wordObj.typingTime) {
                accum.words[index].typingTime.fastest = wordObj.typingTime
            }
            accum.words[index].typingTime.all.push(wordObj.typingTime);

            if (accum.words[index].heatMap.length === 0) {
                accum.words[index].heatMap = heatMap
            }
            else {
                accum.words[index].heatMap.map((mistake, indexHeat) => {
                    let mistake2 = heatMap[indexHeat];
                    if (!mistake && !mistake2) {
                        return undefined
                    }
                    else {
                        return mistake + mistake2
                    }
                });
            }

        });

        return accum
    }, {
        wordsMap: {},
        words: []
    })
};

/**
 * @param {Array} gameSpecificsStats result of function that has this name
 * @return {Object} {[word]: {count: number, heatMat:[number, number, ...],
 *                           mistakes: number, typingTime: {all:[number, number, ...], fastest: number}}}*/
let wordsSpecificStats = exports.wordsSpecificStats = (gameSpecificsStats)=> {
    return gameSpecificsStats.reduce((accum, current, index, arr) => {
        current.words.forEach((wordObj) => {
            var word = wordObj.word;
            if (!accum.hasOwnProperty(word)) {
                accum[word] = {count: 0, mistakes: 0, heatMap: [], typingTime: {all: [], fastest: wordObj.typingTime}}
            }

            accum[word].count += 1; //-
            accum[word].mistakes += wordObj.mistakes;
            accum[word].heatMap.map((mistake, index) => {
                let mistake2 = wordObj.heatMap[index];
                if (!mistake && !mistake2) {
                    return undefined
                }
                else {
                    return mistake + mistake2
                }
            });
            let fastestOld = accum[word].typingTime.fastest;
            let currentSpeed = wordObj.typingTime; //-
            accum[word].typingTime.all.push(currentSpeed); //-
            accum[word].typingTime.fastest = fastestOld < currentSpeed ? fastestOld : currentSpeed; //-


        });
        return accum

    }, {})
};

/**
 * @return {Object} {WPM: number, totalMistakes: number, MPW: number
 * WPM - word per minute
 * MPW - mistakes per word
 * */
let overAllStats = exports.overAllStats = (gameSpecificsStats) => {
    return gameSpecificsStats.reduce((accum, current, index, arr) => {

        accum.WPM.push(current.WPM);
        accum.totalMistakes.push(current.totalMistakesInText);
        accum.MPW.push(current.mistakesPerWord);


        if (index === (arr.length - 1)) {
            accum.WPM = average(accum.WPM);
            accum.totalMistakes = sum(accum.totalMistakes);
            accum.MPW = average(accum.MPW);
        }
        return accum

    }, {WPM: [], totalMistakes: [], MPW: []})
};

/**
 * @return {Array} [Object, Object, ...]*/
let objectToArray = (obj) => {
    var keys = Object.keys(obj);
    return keys.map((key) => {
        if (typeof obj[key] === "string") {
            return JSON.parse(obj[key])
        }
        else {
            return obj[key]
        }
        
    })
};


let sum = function (arr) {
    return arr.reduce(function (s, a) {
        return s + Number(a)
    }, 0)
};

let average = function (arr) {
    return sum(arr) / (arr.length || 1)
};