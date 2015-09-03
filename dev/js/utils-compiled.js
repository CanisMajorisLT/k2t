/**
 * Created by vyt on 2015-08-24.
 */
"use strict";

var React = require("react");

/*
exports.getGamesDataInJSON = function getGamesDataInJSON () {

    let gamesData = window.localStorage.getItem("games");
    return JSON.parse(gamesData)

};

/!**
 * @param {object} data full object of games data {gameId: {}, gameId: {}..}*!/
    exports.saveGamesDataToLocalStorage = function saveGamesDataToLocalStorage (data) {
    let gamesData = window.localStorage.setItem("games", data)

};*/

//not used
exports.filterGames = function filterGames(localStorageOutput) {
    return localStorageOutput.filter(/regex/);
};

exports.makeWordHeatmap = function makeWordHeatmap(word, heatMapArray) {
    return word.split("").map(function (letter, index) {
        var letterStyle = {};
        if (heatMapArray[index] !== undefined) {
            letterStyle.color = "yellow";
        }
        return React.createElement(
            "span",
            { style: letterStyle },
            letter
        );
    });
};

//# sourceMappingURL=utils-compiled.js.map