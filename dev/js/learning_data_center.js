

modules.exports = class LearningDataCenter {
	constructor(){
		this._data = {immediate: [],
					  later: []};
		this.subscribers = [];

	}

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

}