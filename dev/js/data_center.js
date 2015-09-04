/**
 * Created by vyt on 2015-09-03.
 */
let statistics = require("../js/statistics/comprehensive_statistics");
let gameSpecificsStats = statistics.gameSpecificsStats;
let textSpecificStats = statistics.textSpecificStats;
let wordsSpecificStats = statistics.wordsSpecificStats;
let overAllStats = statistics.overAllStats;

/*
 * - sends out data to subscribers when data is updated;
 * - sends data on request (by some query); */
module.exports = class DataCenter {
    constructor() {
        // sources
        this.sc = {
            TEXTS_SPECIFIC: 'dataTextSpecific',
            WORDS_SPECIFIC: 'dataWordsSpecific',
            OVER_ALL: 'overAll'
        };

        this.subscribers = [];
        this._data = this.getStatsFromLocalStorage(this.sc.TEXTS_SPECIFIC, this.sc.WORDS_SPECIFIC, this.sc.OVER_ALL); // paimam kol kas i localstorago ir praranimas fjas
    }

    getAllState(){
        return Object.assign({}, this._data)
    }

    getData(...dataSources) {
        let dataToReturn = dataSources.map(src=> this._data[src]);
        return Object.assign({}, ...dataToReturn)
    }

    updateData(...targets) {
        getStatsFromLocalStorage(...targets);
        updateSubscribers()

    }

    updateSubscribers() {
        this.subscribers.forEach((subObj)=> {
            let dataToReturn = subObj.dataSources.map(src=> this._data[src]);
            return subObj.callback(Object.assign({}, ...dataToReturn))
        })
    }

    // {callback: fnc, dataSources: [this.dataTextSpecific, this.dataWordsSpecific, this.overAll]}
    subscribe(subObj) {
        this.subscribers.push(subObj)
    }

    unsubscribe(subObj) {
        let subIndex = this.subscribers.indexOf(subObj);
        this.subscribers.splice(subIndex, 1)
    }


    getStatsFromLocalStorage(...targets) {
        // this is required for other stat functions to work
        let dataGameSpecific = gameSpecificsStats(localStorage);

        let dataTextSpecific = targets.indexOf("dataTextSpecific") >= 0 && textSpecificStats(dataGameSpecific) || this._data["dataTextSpecific"];
        let dataWordsSpecific = targets.indexOf("dataWordsSpecific") >= 0 && wordsSpecificStats(dataGameSpecific) || this._data["dataWordsSpecific"];
        let overAll = targets.indexOf("overAll") >= 0 && overAllStats(dataGameSpecific) || this._data["overAll"];
        return {
            dataGameSpecific,
            dataTextSpecific,
            dataWordsSpecific,
            overAll
        }
    }
}

