require("babel/polyfill");
let Text = require("./text-compiled");
let async = require("async");
/**
 * Created by vyt on 2015-07-27.
 */

let txt = new Text("labas rytas lietuva snd mes laimesim!");
let gS = {
	words: [
		{mistakes: 0},
		{mistakes: 0},
		{mistakes: 3},
		{mistakes: 0},
		{mistakes: 5},
		{mistakes: 0}
	]
}


function wordsWithContext({repeatEachWord = 1, text = text, gameStats = gameStats}) {
	return gameStats.words.
		reduce((accumulated, current, index)=> {
			if (current.mistakes > 0) {
				let textWord = text.textWords[index];
				let contextBefore = text.textWords.slice((index - 3) >= 0 ? (index - 3) : 0, index);
				let contextAfter = text.textWords.slice(index + 1, index + 4);
				let stringToMake = contextBefore.concat(textWord, contextAfter);

				accumulated.push(stringToMake);


			}
			return accumulated
		}, [])
		.reduce((accumulated, current, index)=> {
			// need to change " " with new line
			return accumulated + (index ? " \n" : "") + current.join("")
		}, "")
}


console.log(wordsWithContext({text: txt, gameStats: gS}));