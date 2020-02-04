"use strict";
exports.__esModule = true;
var base58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
// tslint:disable no-bitwise
exports.base58Encode = function (str) {
    var buffer = str.split('').map(function (s) { return s.charCodeAt(0); });
    var bytes = [0];
    // tslint:disable-next-line: prefer-for-of
    for (var i_1 = 0; i_1 < buffer.length; i_1++) {
        for (var j = 0; j < bytes.length; j++) {
            bytes[j] <<= 8;
        }
        bytes[0] += buffer[i_1];
        var remainder = 0;
        for (var j = 0; j < bytes.length; j++) {
            bytes[j] += remainder;
            remainder = (bytes[j] / 58) | 0;
            bytes[j] %= 58;
        }
        while (remainder) {
            bytes.push(remainder % 58);
            remainder = (remainder / 58) | 0;
        }
    }
    var i = 0;
    while (buffer[i] === 0 && i < buffer.length - 1 && i++) {
        bytes.push(0);
    }
    return bytes.reverse().map(function (b) { return base58[b]; }).join('');
};
exports.base58Decode = function (s) {
    var bytes = [0];
    // tslint:disable-next-line: prefer-for-of
    for (var i_2 = 0; i_2 < s.length; i_2++) {
        var c = s[i_2];
        if (base58.indexOf(c) === -1) {
            throw new Error('Invalid Base58 string!');
        }
        for (var j = 0; j < bytes.length; j++) {
            bytes[j] *= 58;
        }
        bytes[0] += base58.indexOf(c);
        var remainder = 0;
        for (var j = 0; j < bytes.length; j++) {
            bytes[j] += remainder;
            remainder = bytes[j] >> 8;
            bytes[j] &= 255;
        }
        while (remainder) {
            bytes.push(remainder & 255);
            remainder >>= 8;
        }
    }
    var i = 0;
    while (s[i] === '1' && i < s.length - 1 && i++) {
        bytes.push(0);
    }
    return bytes.reverse().map(function (b) { return String.fromCharCode(b); }).join('');
};
