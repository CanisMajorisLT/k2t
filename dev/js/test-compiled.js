"use strict";

require("babel/polyfill");
var Text = require("./text-compiled");
var async = require("async");
/**
 * Created by vyt on 2015-07-27.
 */

var txt = new Text("labas rytas lietuva snd mes laimesim!");
var gS = {
	words: [{ mistakes: 0 }, { mistakes: 0 }, { mistakes: 3 }, { mistakes: 0 }, { mistakes: 5 }, { mistakes: 0 }]
};

function wordsWithContext(_ref) {
	var _ref$repeatEachWord = _ref.repeatEachWord;
	var repeatEachWord = _ref$repeatEachWord === undefined ? 1 : _ref$repeatEachWord;
	var _ref$text = _ref.text;
	var text = _ref$text === undefined ? text : _ref$text;
	var _ref$gameStats = _ref.gameStats;
	var gameStats = _ref$gameStats === undefined ? gameStats : _ref$gameStats;

	return gameStats.words.reduce(function (accumulated, current, index) {
		if (current.mistakes > 0) {
			var textWord = text.textWords[index];
			var contextBefore = text.textWords.slice(index - 3 >= 0 ? index - 3 : 0, index);
			var contextAfter = text.textWords.slice(index + 1, index + 4);
			var stringToMake = contextBefore.concat(textWord, contextAfter);

			accumulated.push(stringToMake);
		}
		return accumulated;
	}, []).reduce(function (accumulated, current, index) {
		// need to change " " with new line
		return accumulated + (index ? " \n" : "") + current.join("");
	}, "");
}

console.log(wordsWithContext({ text: txt, gameStats: gS }));

//# sourceMappingURL=test-compiled.js.map