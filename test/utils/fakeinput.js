/**
 * Created by vyt on 2015-08-14.
 */

function* wordG(word, placeInArray, correct = true) {
    let done = false;
    let mistakeMade = false;
    let returnInXTimes = Math.ceil(Math.random() * 10);
    let wordInLetters = word.split("");
    let currentLetter = 1;
    while (!done) {
        let output = {
            input: wordInLetters.slice(0, currentLetter).join(""),
            word: word,
            wordPlaceInArray: placeInArray
        };
        if (!mistakeMade && !correct) {
            let makeMistake = word.length === currentLetter ? '|' : Math.random() > 0.6 ? "|" : "";
            output.input += makeMistake;

            if (makeMistake !== "") {
                mistakeMade = true;
                if (word.length === currentLetter) {
                    //console.log("--currentLetter");
                    --currentLetter
                }
            }
            yield output;

        }
        else {
            if (word.length + 1 === currentLetter) {
                return output
            }
            yield output;

        }


        if (word.length + 1 === currentLetter) {
            done = true
        }
        ++currentLetter


    }
}

/**
 * @param {Object} textObj from text.js
 * @param {number} mistakes how many mistakes ot make in text*/
module.exports = function* humanlikeTextInput(textObj, mistakes) {
    let mistakesMade = textObj.textLengthInWords >= mistakes ? 0 : mistakes; // to prevent having mroe mistakes then words
    let currentWordPlace = 0;
    //console.log("mistakesMade", mistakesMade);
    //console.log("textLengthInWords", textObj.textLengthInWords);

    for (let word of textObj.textWords) {
        let makeMistake = mistakes > mistakesMade;
        //console.log("make mistakes", makeMistake);
        yield* wordG(word, currentWordPlace, !makeMistake);
        ++currentWordPlace;
        if (makeMistake) {
            ++mistakesMade
        }
    }

};

