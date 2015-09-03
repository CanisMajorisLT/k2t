/**
 * Created by vyt on 2015-07-28.
 */

"use strict";

var textParser = exports.textParser = function (text) {
    return text.split(" ");
};

var wordParser = exports.wordParser = function (word, input) {
    "use strict";
    var inputLength = input.length;
    var wordLength = word.length;
    var time = Date.now();

    if (wordLength < inputLength) {
        // TODO finish dis, cia gal nereik throwinti error
        //throw new Error("input longer than word")
    }

    var matches = word.slice(0, inputLength) === input;
    var allWord = wordLength === inputLength;

    return { word: word, input: input, matches: matches, allWord: allWord, time: time };
};

//# sourceMappingURL=input_parser-compiled.js.map