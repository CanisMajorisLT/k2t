module.exports = class LearningDataCenter {
	constructor() {
		this._data = {
			immediate: [],
			later: []
		};
		this.subscribers = [];
		this.addData = this._addData()

	}

	_addData() {

		return {
			toImmediate: (data)=> {
				this._data.immediate.push(data)
			},

			toLater: (data)=> {
				this._data.later.push(data)
			}
		}

	}
	// not fit for this
	getData(...dataSources) {
		let dataToReturn = dataSources.map((src)=> {
			return {[src]: this._data[src]}
		});
		return Object.assign({}, ...dataToReturn)
	}

	subscribe(subObj) {
		this.subscribers.push(subObj)
	}

	unsubscribe(subObj) {
		let subIndex = this.subscribers.indexOf(subObj);
		this.subscribers.splice(subIndex, 1)
	}

};