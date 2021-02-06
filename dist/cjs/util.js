"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.call = void 0;
var call = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (f) { return f.apply(void 0, args); };
};
exports.call = call;
