/**
 * Created by vyt on 2015-07-28.
 */
let md5 = require("md5");

module.exports = class TextObj {
    constructor(textString) {
        this.textString = textString;
        this.textLength = textString.length;
        this.textLengthInWords = textString.split(" ").length;
        this.textWords = textString.split(" ").map((word, index, ar) => {return index !== (ar.length - 1) ? word + " " : word});
        this.currentWord = 0;
        this.gameId = md5(textString) + "-" + new Date().getTime()
    }
};