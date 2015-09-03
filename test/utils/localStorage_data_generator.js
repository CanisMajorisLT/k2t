/**
 * Created by vyt on 2015-08-15.
 */

let fakeInput = require("./fakeinput");
let Text = require("../../dev/js/text");
let recordStatistics = require("../../dev/js/statistics/record_statistics");
let inputParser = require("../../dev/js/input_parser");
let async = require("async");
let text1 = "The world of typing has changed.";
let text2 = "The ref attribute can be a callback function instead of a name. This callback will be executed immediately after the component is mounted. The referenced component will be passed in as a parameter, and the callback function may use the component immediately, or save the reference for future use (or both).";

module.exports = function (mistakes=0) {
    let txt = new Text(text1);
    let userInputGenerator = fakeInput(txt, mistakes);

    let inputArray = Array.from(userInputGenerator);

    return new Promise(function (resolve, reject) {
        try {
            async.eachSeries(inputArray, function (input, callback) {

                let parsedInput = inputParser.wordParser(input.word, input.input);
                let textData = {
                    lengthInWords: txt.textLengthInWords,
                    gameId: txt.gameId,
                    currentWord: input.wordPlaceInArray
                };

                recordStatistics(parsedInput, textData);

                setTimeout(callback, 5)
            }, resolve)
        } catch (e) {
            reject(e)
        }
    });


};