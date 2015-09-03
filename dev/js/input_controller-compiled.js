/**
 * Created by vyt on 2015-07-28.
 */

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputController = (function () {
    function InputController(text) {
        _classCallCheck(this, InputController);

        this.textObj = text;
    }

    _createClass(InputController, [{
        key: "processInput",
        value: function processInput(inputString) {
            // wordParser(textObj.currentWord, inputString)

        }
    }]);

    return InputController;
})();

//# sourceMappingURL=input_controller-compiled.js.map