require("babel/polyfill");
let Text = require("./text-compiled");
let async = require("async");
/**
 * Created by vyt on 2015-07-27.
 */

function lala (...args) {
  console.log(args.find(x=>x ==='laas'));
}

lala('laas', 'papas', ['hobis']);


let ss = ["labas", 'as'];

console.log(ss.indexOf('hobis'));