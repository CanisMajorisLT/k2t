"use strict";

require("babel/polyfill");
var Text = require("./text-compiled");
/**
 * Created by vyt on 2015-07-27.
 */

var txt = new Text("labas rytas lietuva snd mes laimesim!");
var gS = {
	words: [{ mistakes: 0 }, { mistakes: 0 }, { mistakes: 3 }, { mistakes: 0 }, { mistakes: 5 }, { mistakes: 0 }],
	lol: 5,
	nope: ':)'
};

var gen = regeneratorRuntime.mark(function gen() {
	return regeneratorRuntime.wrap(function gen$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				context$1$0.prev = 0;
				context$1$0.next = 3;
				return 1;

			case 3:
				context$1$0.next = 5;
				return 2;

			case 5:
				return context$1$0.abrupt("return", 3);

			case 8:
				context$1$0.prev = 8;
				context$1$0.t0 = context$1$0["catch"](0);
				context$1$0.next = 12;
				return 4;

			case 12:
			case "end":
				return context$1$0.stop();
		}
	}, gen, this, [[0, 8]]);
});

var x = gen();
console.log(x.next());
console.log(x["throw"](new Error('ji')));
console.log(x.next());

var s = Symbol();

console.log(s);

//# sourceMappingURL=test-compiled.js.map