const crypt = require('crypto')

interface IBinaryLeaf {
    a: {data: any, hash: string},
    b: {data: any, hash: string},
}

interface IBinaryNode {
    hash: string,
    nodes: IBinaryNode[]
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

        if (!tree.nodes[0].a) {
            return this._generateHash(tree.nodes[0].hash + tree.nodes[1].hash) === tree.hash
        }

        if (this._generateHash(tree.nodes[0].a.hash + tree.nodes[0].b.hash) !== tree.hash) {
            return false
        }

        if (this._tree.nodes[0].a.nodes.length > 1) {
            return this.validate(this._tree.nodes[0].a) && this.validate(this._tree.nodes[0].b)
        }
        return true
    }

    public tree(): any { return this._tree }

    public hash(): string {
        return this._tree.hash
    }

    private _createBinaryTree = (data: any[]): IBinaryNode[] => {
        const leaves: IBinaryLeaf[] = this._generateBinaryLeaves(data)
        let tree: any = { hash: '', nodes: this._createNodesFromLeaves(leaves) }
        while (tree.length > 1) {
            tree = { hash: '', nodes: this._createNodesFromLeaves(tree.nodes) }
        }

        tree.hash = this._generateHash(tree.nodes[0].a.hash + tree.nodes[0].b.hash)
        return tree
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
                    hash: this._generateHash(nodes[i].a.hash + nodes[i].b.hash),
                    nodes: [nodes[i].a, nodes[i].b],
                },
                b: {
                    hash: this._generateHash(nodes[i + 1].a.hash + nodes[i + 1].b.hash),
                    nodes: [nodes[i + 1].a, nodes[i + 1].b],
                },
            }
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
