/**
 * Created by vyt on 2015-08-24.
 */
let React = require("react");

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
exports.filterGames = function filterGames (localStorageOutput) {
  return localStorageOutput.filter(/regex/)
};



exports.makeWordHeatmap = function makeWordHeatmap (word, heatMapArray) {
  return word.split("").map((letter, index)=> {
                let letterStyle = {};
                if (heatMapArray[index] !== undefined) {
                    letterStyle.color = "yellow"
                }
                return <span style={letterStyle}>{letter}</span>
            })
};