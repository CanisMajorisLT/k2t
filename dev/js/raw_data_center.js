class RawDataCenter {
	// jeigu sitas oaimtu container object ir paduotu ji i recorder ir tas objectas turetu
	// query mechanizmus, tai tiesiog ji grazinu su query
	constructor(recorder, container) {
		this._container = new container();
		this._recorder = new recorder(StatsObj, this._container);
		this.queryData = this._container.query();
	}

	record(inputResult, textData) {
		// basically same as calling recordStatics
		return this._recorder.recordStatistic(inputResult, textData);
	}
}


class RawDataRecorder {
	constructor(StatsObj, container, backupOnLocalStorage = true) {
		this.StatsObj = StatsObj;
		this.statsObjectsContainer = container; 
		this.backupOnLocalStorage = backupOnLocalStorage;
	}

	getStatsObj(textData) {
		let statsObj = this.statsObjectsContainer.getItem(textData.gameId);
		if (statsObj) {
			return statsObj
		} else {
			let stats = new this.StatsObj(textData);
			this.statsObjectsContainer.setItem(textData.gameId, stats);
			return stats
		}

	}

	recordStatistic(inputResult, textData) {
		let statsObj = this.getStatsObj(textData);
		let oneWordStatCont = statsObj.wordStats[textData.currentWord];
		let wordStats;
		if (oneWordStatCont !== undefined) {
			wordStats = oneWordStatCont
		} else {
			statsObj.wordStats[textData.currentWord] = [];
			wordStats = statsObj.wordStats[textData.currentWord]
		}
		wordStats.push(inputResult);

		if (textData.currentWord + 1 === textData.lengthInWords) {
			statsObj.endTime = Date.now();

			if (this.backupOnLocalStorage === true) {
				window.localStorage.setItem(textData.gameId, JSON.stringify(statsObj))
			}
		}

		// cia reikai pastetuoti nes is idejos jo nereiketu, kadangi grazi getItem ne kopija o linka i obj
		this.statsObjectsContainer.setItem(textData.gameId, statsObj);
	};
}

class StatsObj {
	constructor(textData) {
		this.gameId = textData.gameId;
		this.textLengthInWords = textData.lengthInWords;
		this.startTime = Date.now();
		this.endTime = null;
		this.wordStats = []

	}
}

class StatsObjectsContainer {
	constructor() {
		this.container = {};
		this.initialContainerFill()
	}

	initialContainerFill(){
		Object.keys(localStorage).forEach((key)=>{
			this.container[key] = JSON.parse(localStorage[key])
		})
	}

	getItem(itemId) {
		if (this.container.hasOwnProperty(itemId)) {
			return this.container[itemId]
		}
		else {
			return null
		}
	}
	setItem(itemId, item){
		this.container[itemId] = item;
	}

	/*For when you want to get raw data for other use than live recording of it */
	query() {
		return {
			byId: (itemId) => {return Object.assign({}, this.container[itemId])},
			all: () => {return Object.assign({}, this.container)}

		}
	}
}

module.exports = function initiateDataCenter () {
	return new RawDataCenter(RawDataRecorder, StatsObjectsContainer)
};
