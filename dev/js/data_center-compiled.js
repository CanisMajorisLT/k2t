/**
 * Created by vyt on 2015-09-03.
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LearningDataCenter = require("./learning_data_center");
var RawDataCenter = require("./raw_data_center")();
var statistics = require("../js/statistics/comprehensive_statistics");
var gameSpecificsStats = statistics.gameSpecificsStats;
var textSpecificStats = statistics.textSpecificStats;
var wordsSpecificStats = statistics.wordsSpecificStats;
var overAllStats = statistics.overAllStats;

/*
 * - sends out data to subscribers when data is updated;
 * - sends data on request (by some query); */
module.exports = (function () {
    function DataCenter() {
        var rawData = arguments.length <= 0 || arguments[0] === undefined ? RawDataCenter : arguments[0];

        _classCallCheck(this, DataCenter);

        // sources
        this.sc = {
            GAME_SPECIFIC: 'dataGameSpecific',
            TEXTS_SPECIFIC: 'dataTextSpecific',
            WORDS_SPECIFIC: 'dataWordsSpecific',
            OVER_ALL: 'overAll'
        };

        this.subscribers = [];
        this._data = this.getStatsFromLocalStorage(this.sc.TEXTS_SPECIFIC, this.sc.WORDS_SPECIFIC, this.sc.OVER_ALL); // paimam kol kas i localstorago ir praranimas fjas
        this.rawData = RawDataCenter;
        this.learningData = LearningDataCenter;
    }

    _createClass(DataCenter, [{
        key: "getAllState",
        value: function getAllState() {
            return Object.assign({}, this._data);
        }
    }, {
        key: "getData",
        value: function getData() {
            var _this = this;

            for (var _len = arguments.length, dataSources = Array(_len), _key = 0; _key < _len; _key++) {
                dataSources[_key] = arguments[_key];
            }

            var dataToReturn = dataSources.map(function (src) {
                return _defineProperty({}, src, _this._data[src]);
            });
            return Object.assign.apply(Object, [{}].concat(_toConsumableArray(dataToReturn)));
        }
    }, {
        key: "updateData",
        value: function updateData() {
            for (var _len2 = arguments.length, targets = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                targets[_key2] = arguments[_key2];
            }

            console.log.apply(console, ["data center updating data for"].concat(targets));
            this._data = this.getStatsFromLocalStorage.apply(this, targets);
            this.__updateSubscribers();
            console.log("data now is", this._data);
        }
    }, {
        key: "__updateSubscribers",
        value: function __updateSubscribers() {
            var _this2 = this;

            this.subscribers.forEach(function (subObj) {
                var dataToReturn = subObj.dataSources.map(function (src) {
                    return _this2._data[src];
                });
                return subObj.callback(Object.assign.apply(Object, [{}].concat(_toConsumableArray(dataToReturn))));
            });
        }

        // {callback: fnc, dataSources: [this.dataTextSpecific, this.dataWordsSpecific, this.overAll]}
    }, {
        key: "subscribe",
        value: function subscribe(subObj) {
            this.subscribers.push(subObj);
        }
    }, {
        key: "unsubscribe",
        value: function unsubscribe(subObj) {
            var subIndex = this.subscribers.indexOf(subObj);
            this.subscribers.splice(subIndex, 1);
        }
    }, {
        key: "getStatsFromLocalStorage",
        value: function getStatsFromLocalStorage() {
            // this is required for other stat functions to work
            var dataGameSpecific = gameSpecificsStats(this.rawData.queryData.all());

            for (var _len3 = arguments.length, targets = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                targets[_key3] = arguments[_key3];
            }

            var dataTextSpecific = targets.indexOf("dataTextSpecific") >= 0 && textSpecificStats(dataGameSpecific) || this._data["dataTextSpecific"];
            var dataWordsSpecific = targets.indexOf("dataWordsSpecific") >= 0 && wordsSpecificStats(dataGameSpecific) || this._data["dataWordsSpecific"];
            var overAll = targets.indexOf("overAll") >= 0 && overAllStats(dataGameSpecific) || this._data["overAll"];
            return {
                dataGameSpecific: dataGameSpecific,
                dataTextSpecific: dataTextSpecific,
                dataWordsSpecific: dataWordsSpecific,
                overAll: overAll
            };
        }
    }]);

    return DataCenter;
})();

//# sourceMappingURL=data_center-compiled.js.map