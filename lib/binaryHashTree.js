"use strict";
exports.__esModule = true;
var crypt = require('crypto');
var BinaryHashTree = /** @class */ (function () {
    function BinaryHashTree(data) {
        var _this = this;
        this._createBinaryTree = function (data) {
            var leaves = _this._generateBinaryLeaves(data);
            var tree = { hash: '', nodes: _this._createNodesFromLeaves(leaves) };
            while (tree.length > 1) {
                tree = { hash: '', nodes: _this._createNodesFromLeaves(tree.nodes) };
            }
            tree.hash = _this._generateHash(tree.nodes[0].a.hash + tree.nodes[0].b.hash);
            return tree;
        };
        this._generateBinaryLeaves = function (data) {
            var nodes = [];
            for (var i = 0; i < data.length; i += 2) {
                var node = {
                    a: {
                        data: data[i],
                        hash: _this._generateHash(JSON.stringify(data[i]))
                    },
                    b: {
                        data: data[i + 1],
                        hash: _this._generateHash(JSON.stringify(data[i + 1]))
                    }
                };
                nodes.push(node);
            }
            return nodes;
        };
        this._createNodesFromLeaves = function (nodes) {
            var reduced = [];
            for (var i = 0; i < nodes.length; i += 2) {
                var node = {
                    a: {
                        hash: _this._generateHash(nodes[i].a.hash + nodes[i].b.hash),
                        nodes: [nodes[i].a, nodes[i].b]
                    },
                    b: {
                        hash: _this._generateHash(nodes[i + 1].a.hash + nodes[i + 1].b.hash),
                        nodes: [nodes[i + 1].a, nodes[i + 1].b]
                    }
                };
                reduced.push(node);
            }
            return reduced;
        };
        this._generateHash = function (s) {
            var hash = crypt.createHash('sha256');
            hash.update(s);
            return hash.digest('hex');
        };
        if (Math.ceil(Math.log2(data.length)) !== Math.floor(Math.log2(data.length))) {
            throw new Error('Must be a power of 2 to create binary tree!');
        }
        this._tree = this._createBinaryTree(data);
    }
    BinaryHashTree.prototype.validate = function (tree) {
        if (!tree) {
            tree = this._tree;
        }
        if (!tree.nodes[0].a) {
            return this._generateHash(tree.nodes[0].hash + tree.nodes[1].hash) === tree.hash;
        }
        if (this._generateHash(tree.nodes[0].a.hash + tree.nodes[0].b.hash) !== tree.hash) {
            return false;
        }
        if (this._tree.nodes[0].a.nodes.length > 1) {
            return this.validate(this._tree.nodes[0].a) && this.validate(this._tree.nodes[0].b);
        }
        return true;
    };
    BinaryHashTree.prototype.tree = function () { return this._tree; };
    BinaryHashTree.prototype.hash = function () {
        return this._tree.hash;
    };
    return BinaryHashTree;
}());
exports.BinaryHashTree = BinaryHashTree;
