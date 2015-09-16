/**
 * Created by vyt on 2015-09-13.
 */

function getWordsWithMistakes(gameStats) {

}

export function wordsWithoutContext({repeatEachWord = 10, gameStats = gameStats}) {
	return gameStats.words
		.reduce((accumulated, current)=> {
			if (current.mistakes > 0) {
				for (let i = 0; i < repeatEachWord; i++) {
					accumulated.push(current.word)
				}
			}

			return accumulated
		}, []).join(" ").trim() +"."
}

export function wordsWithContext({repeatEachWord = 1, text = text, gameStats = gameStats}) {
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
			return accumulated + (index ? " " : "") + current.join("").trim()
		}, "") +"."
}



