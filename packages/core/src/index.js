"use strict";
exports.__esModule = true;
exports.res = exports.reduce = exports.add = void 0;
var add = function (a, b) {
    return a + b;
};
exports.add = add;
// test tree-shaking
var reduce = function (a, b) {
    return a - b;
};
exports.reduce = reduce;
exports.res = 'b';
console.log(exports.res);
