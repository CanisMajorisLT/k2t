"use strict";

require("babel/polyfill");
var Text = require("./text-compiled");
var async = require("async");
/**
 * Created by vyt on 2015-07-27.
 */

function lala() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  console.log(args.find(function (x) {
    return x === 'laas';
  }));
}

lala('laas', 'papas', ['hobis']);

var ss = ["labas", 'as'];

console.log(ss.indexOf('hobis'));

//# sourceMappingURL=test-compiled.js.map