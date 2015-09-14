/**
 * Created by vyt on 2015-08-11.
 */
let trimAndRemoveSigns = require("../utils").trimAndRemoveSigns;


let calculateWPM = exports.calculateWPM = (startTime, finishTime, textLengthInWords) => {
    if (!startTime || !finishTime || !textLengthInWords) {
        return 0
    }
    return (textLengthInWords / ((finishTime - startTime) / 1000)) * 60
};

/**@param {object) wordsStatsArray from StatsObj.wordStats
 * @return {object} {totalMistakesInText: 0, words: {word(str): {count: 0, mistakes: 0, heatMap: [], typingTime: {all: [], fastest: null}}}}*/
let wordsStatisticsCalculator_deprected = exports.wordsStatisticsCalculator_deprected = (wordsStatsArray, trimAndClean=true) => {
    return wordsStatsArray
        .map((singleWordStatsArray) => {
            return singleWordStats(singleWordStatsArray, trimAndClean=true)
        })
        .reduce((accumulated, eachTextWordStatsObject) => {
            let word = eachTextWordStatsObject.word;
            let heatMap = eachTextWordStatsObject.heatMap;
            let tempTotalMistakesInText = accumulated.totalMistakesInText + eachTextWordStatsObject.mistakes;
            if (!accumulated.words.hasOwnProperty(word)) {
                accumulated.words[word] = {count: 0, mistakes: 0, heatMap: [], typingTime: {all: [], fastest: null}}
            }

            accumulated.words[word].mistakes += eachTextWordStatsObject.mistakes;
            accumulated.words[word].count += 1;
            let FastestTypingTime = accumulated.words[word].typingTime.fastest;
            if (!FastestTypingTime || FastestTypingTime < eachTextWordStatsObject.typingTime) {
                accumulated.words[word].typingTime.fastest = eachTextWordStatsObject.typingTime
            }
            accumulated.words[word].typingTime.all.push(eachTextWordStatsObject.typingTime);

            if (accumulated.words[word].heatMap.length === 0) {
                accumulated.words[word].heatMap = heatMap
            }
            else {
                accumulated.words[word].heatMap.map((mistake, index) => {
                    let mistake2 = heatMap[index];
                    if (!mistake && !mistake2) {
                        return undefined
                    }
                    else {
                        return mistake + mistake2
                    }
                });
            }


            return {totalMistakesInText: tempTotalMistakesInText, words: accumulated.words}

        }, {totalMistakesInText: 0, words: {}});


};

/**@param {object) wordsStatsArray from StatsObj.wordStats
 * @return {object} {totalMistakesInText: 0, words: [singleWordStats, singleWordStats, {object} {word: str, mistakes: number, heatMap: [], typingTime: number}]}*/
let wordsStatisticsCalculator = exports.wordsStatisticsCalculator = (wordsStatsArray, trimAndClean=true) => {
//TODO: prpalesti jsona, ideti mistakes mapa, word mapa
    return wordsStatsArray
        .map((singleWordStatsArray) => {
            return singleWordStats(singleWordStatsArray, trimAndClean=true)
        })
        .reduce((accumulated, eachTextWordStatsObject) => {
            let tempTotalMistakesInText = accumulated.totalMistakesInText + eachTextWordStatsObject.mistakes;
            accumulated.words.push(eachTextWordStatsObject);
            return {totalMistakesInText: tempTotalMistakesInText, words: accumulated.words}

        }, {totalMistakesInText: 0, words: []});


};


/**
 * @return {object} {word: str, mistakes: number, heatMap: [], typingTime: number}
 * */
let singleWordStats = exports.singleWordStats = (singleWordArray, trimAndClean=true) => {
    return singleWordArray.reduce((accumulated, currentWordStatsObj, index, array) => {
        var word = trimAndClean ? trimAndRemoveSigns(currentWordStatsObj.word) : currentWordStatsObj.word;
        if (!accumulated.word) {
            accumulated.word = word;
        }
        if (accumulated.heatMap.length === 0) {
            accumulated.heatMap = new Array(word.length)
        }

        if (currentWordStatsObj.matches === false) {
            ++accumulated.mistakes;

            let heatMapCoord = accumulated.heatMap[currentWordStatsObj.input.length - 1];
            if (!heatMapCoord) {
                accumulated.heatMap[currentWordStatsObj.input.length - 1] = 1
            }
            else {
                ++accumulated.heatMap[currentWordStatsObj.input.length - 1]
            }
        }
        if (index === 0) {
            accumulated.typingTime.tempStart = currentWordStatsObj.time
        }
        if (index === array.length - 1) {
            let start = accumulated.typingTime.tempStart;
            accumulated.typingTime = currentWordStatsObj.time - start
        }

        return accumulated
    }, {word: null, mistakes: 0, heatMap: [], typingTime: {tempStart: 0, tempEnd: 0}})
};

