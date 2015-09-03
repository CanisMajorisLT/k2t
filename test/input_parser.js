/**
 * Created by vyt on 2015-07-28.
 */

var chai = require("chai");
var should = chai.should();

var wordParser = require("../dev/js/input_parser-compiled").wordParser;
var textParser = require("../dev/js/input_parser-compiled").textParser;


describe("inputParser", function () {
    var word = "labas";
    var rightPartial = "lab";
    var wrongPArtial1 = "las";
    var wrongPArtial2 = ".las";
    var wrongPArtial3 = " las";
    var rightFull = "labas";
    var tooLong = "labas,";
    describe("partially inputted word parsing", function () {

        it("should return matches false for wrong partial input", function () {
            wordParser(word, wrongPArtial1).matches.should.equal(false);
            wordParser(word, wrongPArtial2).matches.should.equal(false);
            wordParser(word, wrongPArtial3).matches.should.equal(false)
        });

        it("should return matches true for correct partial input", function () {
            wordParser(word, rightPartial).matches.should.equal(true)

        })
    });

    describe("fully inputted word parsing", function () {
        it("should indicate that input length is the same as word length", function () {
            wordParser(word, rightFull).allWord.should.equal(true)
        });

        it("should indicate that input length is longer than word length", function () {
            //(function () {
            //    wordParser(word, tooLong)
            //}).should.throw(Error)
        })
    })
});


describe("textParser", function () {
    var text = "The world of typing has changed. In the 1970s, every business had rooms full of secretaries whose job it was to type letters that had been hand-written. They were copying the writing into a more readable format. In the early 1980s, the personal computer became a common office machine.";
    var textWithSpaceAtTheEnd = "The world of typing has changed. In the 1970s, every business had rooms full of secretaries whose job it was to type letters that had been hand-written. They were copying the writing into a more readable format. In the early 1980s, the personal computer became a common office machine. ";
    it("should split given text by space into an array", function () {
        textParser(text).should.be.a("array")
    })
});