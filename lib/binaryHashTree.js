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
                actual = p.position === 'left'
                    ? _this._generateHash(p.proof + actual)
                    : _this._generateHash(actual + p.proof);
            });
            return actual === expected;
        };
        this.getProofs = function (hash) {
            var taProofs = { proof: [] };
            var tbProofs = { proof: [] };
            var ta = _this.findProof(_this._tree.a, hash, taProofs);
            var tb = _this.findProof(_this._tree.b, hash, tbProofs);
            if (ta) {
                ta.proof.unshift({ proof: _this._tree.b.hash, position: 'right' });
                return ta.proof.reverse();
            }
            else if (ta) {
                tb.proof.unshift({ proof: _this._tree.a.hash, position: 'left' });
                return ta.proof.reverse();
            }
            return false;
        };
        this.findProof = function (node, hash, res) {
            if (node.hash === hash) {
                return { node: node };
            }
            if (!node.a) {
                return false;
            }
            if (node.a.hash === hash) {
                res.proof.push({ start: true, proof: node.b.hash, position: 'right' });
                return res;
            }
            if (node.b.hash === hash) {
                res.proof.push({ start: true, proof: node.a.hash, position: 'left' });
                return res;
            }
            var taProof = { proof: res.proof.slice() };
            taProof.proof.push({ proof: node.b.hash, position: 'right' });
            var ta = _this.findProof(node.a, hash, taProof);
            if (ta) {
                return ta;
            }
            var tbProof = { proof: res.proof.slice() };
            tbProof.proof.push({ proof: node.a.hash, position: 'left' });
            var tb = _this.findProof(node.b, hash, tbProof);
            if (tb) {
                return tb;
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
                        a: nodes[i],
                        b: nodes[i + 1],
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
                        a: nodes[i].a,
                        b: nodes[i].b,
                        hash: _this._generateHash(nodes[i].a.hash + nodes[i].b.hash)
                    },
                    b: {
                        a: nodes[i + 1].a,
                        b: nodes[i + 1].b,
                        hash: _this._generateHash(nodes[i + 1].a.hash + nodes[i + 1].b.hash)
                    },
                    hash: ''
                };
                node.hash = _this._generateHash(node.a.hash + node.b.hash);
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
        if (!tree.a) {
            return this._generateHash(JSON.stringify(tree.data)) === tree.hash;
        }
        if (this._generateHash(tree.a.hash + tree.b.hash) !== tree.hash) {
            return false;
        }
        if (tree.a.a) {
            return this.validate(tree.a.a) && this.validate(tree.b.b);
        }
        return true;
    };
    BinaryHashTree.prototype.tree = function () { return this._tree; };
    BinaryHashTree.prototype.hash = function () { return this._tree.hash; };
    return BinaryHashTree;
}());
exports.BinaryHashTree = BinaryHashTree;
