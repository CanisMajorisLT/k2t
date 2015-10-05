/**
 * Created by vyt on 2015-09-13.
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.wordsWithoutContext = wordsWithoutContext;
exports.wordsWithContext = wordsWithContext;
function getWordsWithMistakes(gameStats) {}

function wordsWithoutContext(_ref) {
	var _ref$repeatEachWord = _ref.repeatEachWord;
	var repeatEachWord = _ref$repeatEachWord === undefined ? 10 : _ref$repeatEachWord;
	var _ref$gameStats = _ref.gameStats;
	var gameStats = _ref$gameStats === undefined ? gameStats : _ref$gameStats;

	return gameStats.words.reduce(function (accumulated, current) {
		if (current.mistakes > 0) {
			for (var i = 0; i < repeatEachWord; i++) {
				accumulated.push(current.word);
			}
		}

		return accumulated;
	}, []).join(" ").trim() + ".";
}

function wordsWithContext(_ref2) {
	var _ref2$repeatEachWord = _ref2.repeatEachWord;
	var repeatEachWord = _ref2$repeatEachWord === undefined ? 1 : _ref2$repeatEachWord;
	var _ref2$text = _ref2.text;
	var text = _ref2$text === undefined ? text : _ref2$text;
	var _ref2$gameStats = _ref2.gameStats;
	var gameStats = _ref2$gameStats === undefined ? gameStats : _ref2$gameStats;

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
		return accumulated + (index ? " " : "") + current.join("").trim();
	}, "") + ".";
}

//# sourceMappingURL=traning_string_generators-compiled.js.map