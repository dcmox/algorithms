"use strict";
exports.__esModule = true;
var LinkedList = /** @class */ (function () {
    function LinkedList(items) {
        this._index = 0;
        this._list = linkedListFromArray(items);
    }
    LinkedList.prototype.next = function () { return this._list[this._index].next; };
    LinkedList.prototype.data = function () { return this._list[this._index].data; };
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
