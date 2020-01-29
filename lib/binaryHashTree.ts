const crypt = require('crypto')

interface IBinaryLeaf {
    a: {data: any, hash: string},
    b: {data: any, hash: string},
}

interface IBinaryNode {
    hash: string,
    a: IBinaryNode,
    b: IBinaryNode,
}

export class BinaryHashTree {
    private _tree: any
    constructor(data: any[]) {
        if (Math.ceil(Math.log2(data.length)) !== Math.floor(Math.log2(data.length))) {
            throw new Error('Must be a power of 2 to create binary tree!')
        }
        this._tree = this._createBinaryTree(data)
    }

    public validate(tree?: any): boolean {
        if (!tree) { tree = this._tree }
        if (!tree.a) { return this._generateHash(JSON.stringify(tree.data)) === tree.hash }
        if (this._generateHash(tree.a.hash + tree.b.hash) !== tree.hash) { return false }
        if (tree.a.a) { return this.validate(tree.a.a) && this.validate(tree.b.b) }
        return true
    }

    public tree(): any { return this._tree }

    public hash(): string { return this._tree.hash }

    public verifyHash = (hash: string): any => {
        const proofs: any[] = this.getProofs(hash)
        const expected: string = this._tree.hash
        let actual: string = hash
        console.log(proofs)
        proofs.forEach((p: any) => {
            actual = p.position === 'left'
            ? this._generateHash(p.proof + actual)
            : this._generateHash(actual + p.proof)
        })
        return actual === expected
    }

    public getProofs = (hash: string): any => {
        const taProofs: any = {proof: []}
        const tbProofs: any = {proof: []}
        const ta = this.findProof(this._tree.a, hash, taProofs)
        const tb = this.findProof(this._tree.b, hash, tbProofs)
        if (ta) {
            ta.proof.unshift({proof: this._tree.b.hash, position: 'right'})
            return ta.proof.reverse()
        } else if (ta) {
            tb.proof.unshift({proof: this._tree.a.hash, position: 'left'})
            return ta.proof.reverse()
        }
        return false
    }

    public findProof = (node: any, hash: string, res: any): any => {
        if (node.hash === hash) { return { node } }
        if (!node.a) { return false }
        if (node.a.hash === hash ) {
            res.proof.push({start: true, proof: node.b.hash, position: 'right' })
            return res
        }
        if (node.b.hash === hash ) {
            res.proof.push({start: true, proof: node.a.hash, position: 'left' })
            return res
        }
        const taProof = { proof: res.proof.slice() }
        taProof.proof.push({proof: node.b.hash, position: 'right' })
        const ta = this.findProof(node.a, hash, taProof)
        if (ta) { return ta }

        const tbProof = { proof: res.proof.slice() }
        tbProof.proof.push({proof: node.a.hash, position: 'left' })
        const tb = this.findProof(node.b, hash, tbProof)
        if (tb) { return tb }
        return false
    }

    private _createBinaryTree = (data: any[]): IBinaryNode => {
        const leaves: IBinaryLeaf[] = this._generateBinaryLeaves(data)
        let nodes: IBinaryNode[] = this._createNodesFromLeaves(leaves)
        while (nodes.length > 1) {
            const pnodes: IBinaryNode[] = []
            for (let i = 0; i < nodes.length; i += 2) {
                const pnode = {
                    a: nodes[i],
                    b: nodes[i + 1],
                    hash: this._generateHash(nodes[i].hash + nodes[i + 1].hash),
                }
                pnodes.push(pnode)
            }
            nodes = pnodes
        }
        return nodes[0]
    }

    private _generateBinaryLeaves = (data: any[]): IBinaryLeaf[] => {
        const nodes: IBinaryLeaf[] = []
        for (let i = 0; i < data.length; i += 2) {
            const node: IBinaryLeaf = {
                a: {
                    data: data[i],
                    hash: this._generateHash(JSON.stringify(data[i])),
                },
                b: {
                    data: data[i + 1],
                    hash: this._generateHash(JSON.stringify(data[i + 1])),
                },
            }
            nodes.push(node)
        }
        return nodes
    }

    private _createNodesFromLeaves = (nodes: IBinaryLeaf[]): IBinaryNode[] => {
        const reduced: any = []
        for (let i = 0; i < nodes.length; i += 2) {
            const node = {
                a: {
                    a: nodes[i].a,
                    b: nodes[i].b,
                    hash: this._generateHash(nodes[i].a.hash + nodes[i].b.hash),
                },
                b: {
                    a: nodes[i + 1].a,
                    b: nodes[i + 1].b,
                    hash: this._generateHash(nodes[i + 1].a.hash + nodes[i + 1].b.hash),
                },
                hash: '',
            }
            node.hash = this._generateHash(node.a.hash + node.b.hash)
            reduced.push(node)
        }
        return reduced
    }

    private _generateHash = (s: string) => {
        const hash = crypt.createHash('sha256')
        hash.update(s)
        return hash.digest('hex')
    }
}
