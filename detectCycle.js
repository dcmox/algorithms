"use strict";
exports.__esModule = true;
var linkedList_1 = require("./lib/linkedList");
exports.detectCycle = function (nodes) {
    var slow;
    var fast;
    if (nodes instanceof linkedList_1.LinkedList) {
        slow = nodes;
        fast = nodes;
    }
    else {
        slow = nodes[0];
        fast = nodes[0];
    }
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (fast === slow) {
            return true;
        }
    }
    return false;
};
