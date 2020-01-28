"use strict";
exports.__esModule = true;
var LinkedList = /** @class */ (function () {
    function LinkedList(items) {
        this._index = 0;
        this._list = linkedListFromArray(items);
    }
    Object.defineProperty(LinkedList.prototype, "next", {
        get: function () { return this._list[this._index].next; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinkedList.prototype, "data", {
        get: function () { return this._list[this._index].data; },
        enumerable: true,
        configurable: true
    });
    return LinkedList;
}());
exports.LinkedList = LinkedList;
var linkedListFromArray = function (items) {
    var nodes = [];
    var headRef = null;
    for (var i = items.length - 1; i > -1; i--) {
        var node = { next: headRef, data: items[i] };
        nodes.push(node);
        headRef = node;
    }
    return nodes.reverse();
};
