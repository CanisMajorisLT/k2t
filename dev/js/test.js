require("babel/polyfill");
let Text = require("./text-compiled");
/**
 * Created by vyt on 2015-07-27.
 */

let txt = new Text("labas rytas lietuva snd mes laimesim!");
let gS = {
	words: [
		{mistakes: 0},
		{mistakes: 0},
		{mistakes: 3},
		{mistakes: 0},
		{mistakes: 5},
		{mistakes: 0}
	],
	lol: 5,
	nope: ':)'
};

let gen = function* () {
	try {
	yield 1;
	yield 2;
	return 3
	}
	catch(e){
		yield 4
	}

};

let x = gen();
console.log(x.next());
console.log(x.throw(new Error('ji')));
console.log(x.next());


var s = Symbol();

console.log(s);