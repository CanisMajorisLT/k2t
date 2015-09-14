"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RawDataCenter = (function () {
	// jeigu sitas oaimtu container object ir paduotu ji i recorder ir tas objectas turetu
	// query mechanizmus, tai tiesiog ji grazinu su query

	function RawDataCenter(recorder, container) {
		_classCallCheck(this, RawDataCenter);

		this._container = new container();
		this._recorder = new recorder(StatsObj, this._container);
		this.queryData = this._container.query();
	}

	_createClass(RawDataCenter, [{
		key: "record",
		value: function record(inputResult, textData) {
			// basically same as calling recordStatics
			return this._recorder.recordStatistic(inputResult, textData);
		}
	}]);

	return RawDataCenter;
})();

var RawDataRecorder = (function () {
	function RawDataRecorder(StatsObj, container) {
		var backupOnLocalStorage = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

		_classCallCheck(this, RawDataRecorder);

		this.StatsObj = StatsObj;
		this.statsObjectsContainer = container;
		this.backupOnLocalStorage = backupOnLocalStorage;
	}

	_createClass(RawDataRecorder, [{
		key: "getStatsObj",
		value: function getStatsObj(textData) {
			var statsObj = this.statsObjectsContainer.getItem(textData.gameId);
			if (statsObj) {
				return statsObj;
			} else {
				var stats = new this.StatsObj(textData);
				this.statsObjectsContainer.setItem(textData.gameId, stats);
				return stats;
			}
		}
	}, {
		key: "recordStatistic",
		value: function recordStatistic(inputResult, textData) {
			var statsObj = this.getStatsObj(textData);
			var oneWordStatCont = statsObj.wordStats[textData.currentWord];
			var wordStats = undefined;
			if (oneWordStatCont !== undefined) {
				wordStats = oneWordStatCont;
			} else {
				statsObj.wordStats[textData.currentWord] = [];
				wordStats = statsObj.wordStats[textData.currentWord];
			}
			wordStats.push(inputResult);

			if (textData.currentWord + 1 === textData.lengthInWords) {
				statsObj.endTime = Date.now();

				if (this.backupOnLocalStorage === true) {
					window.localStorage.setItem(textData.gameId, JSON.stringify(statsObj));
				}
			}

			// cia reikai pastetuoti nes is idejos jo nereiketu, kadangi grazi getItem ne kopija o linka i obj
			this.statsObjectsContainer.setItem(textData.gameId, statsObj);
		}
	}]);

	return RawDataRecorder;
})();

var StatsObj = function StatsObj(textData) {
	_classCallCheck(this, StatsObj);

	this.gameId = textData.gameId;
	this.textLengthInWords = textData.lengthInWords;
	this.startTime = Date.now();
	this.endTime = null;
	this.wordStats = [];
};

var StatsObjectsContainer = (function () {
	function StatsObjectsContainer() {
		_classCallCheck(this, StatsObjectsContainer);

		this.container = {};
		initialContainerFill();
	}

	_createClass(StatsObjectsContainer, [{
		key: "initialContainerFill",
		value: function initialContainerFill() {
			var _this = this;

			Object.keys(localStorage).forEach(function (key) {
				_this.container[key] = JSON.parse(localStorage[key]);
			});
		}
	}, {
		key: "getItem",
		value: function getItem(itemId) {
			if (this.container.hasOwnProperty(itemId)) {
				return this.container[itemId];
			} else {
				return null;
			}
		}
	}, {
		key: "setItem",
		value: function setItem(itemId, item) {
			this.container[itemId] = item;
		}

		/*For when you want to get raw data for other use than live recording of it */
	}, {
		key: "query",
		value: function query() {
			var _this2 = this;

			return {
				byId: function byId(itemId) {
					return Object.assign({}, _this2.container[itemId]);
				},
				all: function all() {
					return Object.assign({}, _this2.container);
				}

			};
		}
	}]);

	return StatsObjectsContainer;
})();

module.exports = function initiateDataCenter() {
	return new RawDataCenter(RawDataRecorder, StatsObjectsContainer);
};

//# sourceMappingURL=raw_data_center-compiled.js.map