/**
 * Created by vyt on 2015-07-28.
 */
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var md5 = require("md5");

module.exports = function TextObj(textString) {
    _classCallCheck(this, TextObj);

    this.textString = textString;
    this.textLength = textString.length;
    this.textLengthInWords = textString.split(" ").length;
    this.textWords = textString.split(" ").map(function (word, index, ar) {
        return index !== ar.length - 1 ? word + " " : word;
    });
    this.currentWord = 0;
    this.gameId = md5(textString) + "-" + new Date().getTime();
};

//# sourceMappingURL=text-compiled.js.map