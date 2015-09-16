/**
 * Created by vyt on 2015-07-28.
 */


let textParser = exports.textParser = function (text) {
    return text.split(" ")
};

let wordParser = exports.wordParser =  function (word, input) {
    "use strict";
    let inputLength = input.length;
    let wordLength = word.length;
    let time = Date.now();

    if (wordLength < inputLength) {
        // TODO finish dis, cia gal nereik throwinti error
        // FIXME buna buggas kai du tarpai is eiles, tada vienas is inputu buna tarpas ir lb neaisku kad tai yra inputas, jo nesurenderina kazkodel atrodo kad nera tarpo
        // FIXME wordo inputo greitis dar priklauso nuo to ar jsi paskutinis zodis (pvz neturi tarpo [nors iprastai paskutinsi tures taska])
        //throw new Error("input longer than word")
    }


    let matches = word.slice(0, inputLength) === input;
    let allWord = wordLength === inputLength;


    return {word, input, matches, allWord, time}

};


