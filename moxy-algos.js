"use strict";
/**
 * Daniel Moxon
 * Copyright (C) 2020
 * https://github.com/dcmox/moxy-algos
 */
exports.__esModule = true;
var detectCycle_1 = require("./detectCycle");
var base58_1 = require("./lib/base58");
var binaryHashTree_1 = require("./lib/binaryHashTree");
var hashedList_1 = require("./lib/hashedList");
var linkedList_1 = require("./lib/linkedList");
var sha256_1 = require("./lib/sha256");
var MoxyAlgos = /** @class */ (function () {
    function MoxyAlgos() {
    }
    MoxyAlgos.HashedList = function (items) { return new hashedList_1.HashedList(items); };
    MoxyAlgos.LinkedList = function (items) { return new linkedList_1.LinkedList(items); };
    MoxyAlgos.detectCycle = function (nodes) { return detectCycle_1.detectCycle(nodes); };
    MoxyAlgos.BinaryHashTree = function (data) { return new binaryHashTree_1.BinaryHashTree(data); };
    MoxyAlgos.sha256 = function (data) { return sha256_1.sha256(data); };
    MoxyAlgos.base58Encode = function (data) { return base58_1.base58Encode(data); };
    MoxyAlgos.base58Decode = function (data) { return base58_1.base58Decode(data); };
    return MoxyAlgos;
}());
exports.MoxyAlgos = MoxyAlgos;
exports["default"] = MoxyAlgos;
