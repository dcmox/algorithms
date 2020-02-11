"use strict";
exports.__esModule = true;
var crypt = require('crypto');
var BinaryHashTree = /** @class */ (function () {
    function BinaryHashTree(data) {
        var _this = this;
        this.verifyHash = function (hash) {
            var proofs = _this.getProofs(hash);
            var expected = _this._tree.hash;
            var actual = hash;
            console.log(proofs);
            proofs.forEach(function (p) {
                actual =
                    p.position === 'left'
                        ? _this._generateHash(p.proof + actual)
                        : _this._generateHash(actual + p.proof);
            });
            return actual === expected;
        };
        this.getProofs = function (hash) {
            var leftProofs = { proof: [] };
            var rightProofs = { proof: [] };
            var left = _this.findProof(_this._tree.left, hash, leftProofs);
            var right = _this.findProof(_this._tree.right, hash, rightProofs);
            if (left) {
                left.proof.unshift({
                    proof: _this._tree.right.hash,
                    position: 'right'
                });
                return left.proof.reverse();
            }
            else if (right) {
                right.proof.unshift({
                    proof: _this._tree.left.hash,
                    position: 'left'
                });
                return right.proof.reverse();
            }
            return false;
        };
        this.findProof = function (node, hash, res) {
            if (node.hash === hash) {
                return { node: node };
            }
            if (!node.left) {
                return false;
            }
            if (node.left.hash === hash) {
                res.proof.push({
                    start: true,
                    proof: node.right.hash,
                    position: 'right'
                });
                return res;
            }
            if (node.right.hash === hash) {
                res.proof.push({
                    start: true,
                    proof: node.left.hash,
                    position: 'left'
                });
                return res;
            }
            var leftProof = { proof: res.proof.slice() };
            leftProof.proof.push({ proof: node.right.hash, position: 'right' });
            var left = _this.findProof(node.left, hash, leftProof);
            if (left) {
                return left;
            }
            var rightProof = { proof: res.proof.slice() };
            rightProof.proof.push({ proof: node.left.hash, position: 'left' });
            var right = _this.findProof(node.right, hash, rightProof);
            if (right) {
                return right;
            }
            return false;
        };
        this._createBinaryTree = function (data) {
            var leaves = _this._generateBinaryLeaves(data);
            var nodes = _this._createNodesFromLeaves(leaves);
            while (nodes.length > 1) {
                var pnodes = [];
                for (var i = 0; i < nodes.length; i += 2) {
                    var pnode = {
                        left: nodes[i],
                        right: nodes[i + 1],
                        hash: _this._generateHash(nodes[i].hash + nodes[i + 1].hash)
                    };
                    pnodes.push(pnode);
                }
                nodes = pnodes;
            }
            return nodes[0];
        };
        this._generateBinaryLeaves = function (data) {
            var nodes = [];
            for (var i = 0; i < data.length; i += 2) {
                var node = {
                    left: {
                        data: data[i],
                        hash: _this._generateHash(JSON.stringify(data[i]))
                    },
                    right: {
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
                    left: {
                        left: nodes[i].left,
                        right: nodes[i].right,
                        hash: _this._generateHash(nodes[i].left.hash + nodes[i].right.hash)
                    },
                    right: {
                        left: nodes[i + 1].left,
                        right: nodes[i + 1].right,
                        hash: _this._generateHash(nodes[i + 1].left.hash + nodes[i + 1].right.hash)
                    },
                    hash: ''
                };
                node.hash = _this._generateHash(node.left.hash + node.right.hash);
                reduced.push(node);
            }
            return reduced;
        };
        this._generateHash = function (s) {
            var hash = crypt.createHash('sha256');
            hash.update(s);
            return hash.digest('hex');
        };
        if (Math.ceil(Math.log2(data.length)) !==
            Math.floor(Math.log2(data.length))) {
            throw new Error('Must be a power of 2 to create binary tree!');
        }
        this._tree = this._createBinaryTree(data);
    }
    BinaryHashTree.prototype.validate = function (tree) {
        if (!tree) {
            tree = this._tree;
        }
        if (!tree.left) {
            return this._generateHash(JSON.stringify(tree.data)) === tree.hash;
        }
        if (this._generateHash(tree.left.hash + tree.right.hash) !== tree.hash) {
            return false;
        }
        if (tree.left.left) {
            return (this.validate(tree.left.left) && this.validate(tree.right.right));
        }
        return true;
    };
    BinaryHashTree.prototype.tree = function () {
        return this._tree;
    };
    BinaryHashTree.prototype.hash = function () {
        return this._tree.hash;
    };
    return BinaryHashTree;
}());
exports.BinaryHashTree = BinaryHashTree;
