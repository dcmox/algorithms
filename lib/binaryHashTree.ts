const crypt = require('crypto')

interface IBinaryLeaf {
	left: { data: any; hash: string }
	right: { data: any; hash: string }
}

interface IBinaryNode {
	hash: string
	left: IBinaryNode
	right: IBinaryNode
}

export class BinaryHashTree {
	private _tree: any
	constructor(data: any[]) {
		if (
			Math.ceil(Math.log2(data.length)) !==
			Math.floor(Math.log2(data.length))
		) {
			throw new Error('Must be a power of 2 to create binary tree!')
		}
		this._tree = this._createBinaryTree(data)
	}

	public validate(tree?: any): boolean {
		if (!tree) {
			tree = this._tree
		}
		if (!tree.left) {
			return this._generateHash(JSON.stringify(tree.data)) === tree.hash
		}
		if (
			this._generateHash(tree.left.hash + tree.right.hash) !== tree.hash
		) {
			return false
		}
		if (tree.left.left) {
			return (
				this.validate(tree.left.left) && this.validate(tree.right.right)
			)
		}
		return true
	}

	public tree(): any {
		return this._tree
	}

	public hash(): string {
		return this._tree.hash
	}

	public verifyHash = (hash: string): any => {
		const proofs: any[] = this.getProofs(hash)
		const expected: string = this._tree.hash
		let actual: string = hash
		console.log(proofs)
		proofs.forEach((p: any) => {
			actual =
				p.position === 'left'
					? this._generateHash(p.proof + actual)
					: this._generateHash(actual + p.proof)
		})
		return actual === expected
	}

	public getProofs = (hash: string): any => {
		const leftProofs: any = { proof: [] }
		const rightProofs: any = { proof: [] }
		const left = this.findProof(this._tree.left, hash, leftProofs)
		const right = this.findProof(this._tree.right, hash, rightProofs)
		if (left) {
			left.proof.unshift({
				proof: this._tree.right.hash,
				position: 'right',
			})
			return left.proof.reverse()
		} else if (right) {
			right.proof.unshift({
				proof: this._tree.left.hash,
				position: 'left',
			})
			return right.proof.reverse()
		}
		return false
	}

	public findProof = (node: any, hash: string, res: any): any => {
		if (node.hash === hash) {
			return { node }
		}
		if (!node.left) {
			return false
		}
		if (node.left.hash === hash) {
			res.proof.push({
				start: true,
				proof: node.right.hash,
				position: 'right',
			})
			return res
		}
		if (node.right.hash === hash) {
			res.proof.push({
				start: true,
				proof: node.left.hash,
				position: 'left',
			})
			return res
		}
		const leftProof = { proof: res.proof.slice() }
		leftProof.proof.push({ proof: node.right.hash, position: 'right' })
		const left = this.findProof(node.left, hash, leftProof)
		if (left) {
			return left
		}

		const rightProof = { proof: res.proof.slice() }
		rightProof.proof.push({ proof: node.left.hash, position: 'left' })
		const right = this.findProof(node.right, hash, rightProof)
		if (right) {
			return right
		}
		return false
	}

	private _createBinaryTree = (data: any[]): IBinaryNode => {
		const leaves: IBinaryLeaf[] = this._generateBinaryLeaves(data)
		let nodes: IBinaryNode[] = this._createNodesFromLeaves(leaves)
		while (nodes.length > 1) {
			const pnodes: IBinaryNode[] = []
			for (let i = 0; i < nodes.length; i += 2) {
				const pnode = {
					left: nodes[i],
					right: nodes[i + 1],
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
				left: {
					data: data[i],
					hash: this._generateHash(JSON.stringify(data[i])),
				},
				right: {
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
				left: {
					left: nodes[i].left,
					right: nodes[i].right,
					hash: this._generateHash(
						nodes[i].left.hash + nodes[i].right.hash,
					),
				},
				right: {
					left: nodes[i + 1].left,
					right: nodes[i + 1].right,
					hash: this._generateHash(
						nodes[i + 1].left.hash + nodes[i + 1].right.hash,
					),
				},
				hash: '',
			}
			node.hash = this._generateHash(node.left.hash + node.right.hash)
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
