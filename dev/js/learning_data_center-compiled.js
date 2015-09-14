"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

modules.exports = (function () {
	function LearningDataCenter() {
		_classCallCheck(this, LearningDataCenter);

		this._data = {
			immediate: [],
			later: []
		};
		this.subscribers = [];
	}

	_createClass(LearningDataCenter, [{
		key: "addData",
		value: function addData() {
			var _this = this;

			return {
				toImmediate: function toImmediate(data) {
					_this._data.immediate.push(data);
				},

				toLater: function toLater(data) {
					_this._data.later.push(data);
				}
			};
		}
	}, {
		key: "getData",
		value: function getData() {
			var _this2 = this;

			for (var _len = arguments.length, dataSources = Array(_len), _key = 0; _key < _len; _key++) {
				dataSources[_key] = arguments[_key];
			}

			var dataToReturn = dataSources.map(function (src) {
				return _defineProperty({}, src, _this2._data[src]);
			});
			return Object.assign.apply(Object, [{}].concat(_toConsumableArray(dataToReturn)));
		}
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
	}]);

	return LearningDataCenter;
})();

//# sourceMappingURL=learning_data_center-compiled.js.map