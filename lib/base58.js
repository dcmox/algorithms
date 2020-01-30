"use strict";
exports.__esModule = true;
var base58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
// tslint:disable no-bitwise
exports.base58Encode = function (str) {
    var hex = parseInt(str.split('').map(function (s) { return s.charCodeAt(0).toString(16); }).join(''), 16);
    var bytes = [];
    while (hex) {
        bytes.push(hex % 58);
        hex = Math.floor(hex /= 58);
    }
    return bytes.reverse().map(function (b) { return base58[b]; }).join('');
};
exports.base58Decode = function (s) {
    var hex = 0;
    for (var i = 0; i < s.length; i++) {
        if (base58.indexOf(s[i]) === -1) {
            throw new Error('Not a valid base58 string!');
        }
        hex += base58.indexOf(s[i]) * (Math.pow(58, s.length - i - 1));
    }
    hex = hex.toString(16);
    var result = '';
    for (var n = 0; n < hex.length; n += 2) {
        result += String.fromCharCode(parseInt(hex.slice(n, n + 2), 16));
    }
    return result;
};
