"use strict";
exports.__esModule = true;
var crypt = require('crypto');
var hashedListFromArray = function (items) {
    var nodes = [];
    for (var i = 0; i < items.length; i++) {
        var node = { index: i, data: items[i], timestamp: new Date().valueOf(), hash: '' };
        nodes.push(node);
        if (i !== 0) {
            var hash = crypt.createHash('sha256');
            hash.update(JSON.stringify(nodes[i - 1]));
            nodes[i].hash = hash.digest('hex');
        }
    }
    return nodes;
};
var HashedList = /** @class */ (function () {
    function HashedList(items) {
        this._index = 0;
        this._list = hashedListFromArray(items);
    }
    HashedList.prototype.add = function (item) {
        var hash = crypt.createHash('sha256');
        hash.update(JSON.stringify(this._list[this._list.length - 1]));
        this._list.push({
            data: item,
            hash: hash.digest('hex'),
            index: this._list.length,
            timestamp: new Date().valueOf()
        });
        return this._list[this._list.length - 1];
    };
    HashedList.prototype.validate = function () {
        if (this._list[0].hash !== '') {
            return false;
        }
        for (var i = 1; i < this._list.length; i++) {
            var hash = crypt.createHash('sha256');
            hash.update(JSON.stringify(this._list[i - 1]));
            if (hash.digest('hex') !== this._list[i].hash) {
                return false;
            }
        }
        return true;
    };
    HashedList.prototype.next = function () {
        return this._list[++this._index];
    };
    HashedList.prototype.pop = function () {
        return this._list.pop();
    };
    HashedList.prototype.rewind = function () { this._index = 0; };
    HashedList.prototype.data = function () { return this._list[this._index].data; };
    HashedList.prototype.list = function () { return this._list; };
    HashedList.prototype.hash = function () {
        var s = '';
        for (var i = 1; i < this._list.length; i++) {
            s += this._list[i].hash;
        }
        var hash = crypt.createHash('sha256');
        hash.update(s);
        return hash.digest('hex');
    };
    return HashedList;
}());
exports.HashedList = HashedList;
