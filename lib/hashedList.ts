import { IHashedNode } from './interfaces'

const crypt = require('crypto')

const hashedListFromArray = (items: any[]) => {
    const nodes: IHashedNode[] = []
    for (let i = 0; i < items.length; i++) {
        const node = {index: i, data: items[i], timestamp: new Date().valueOf(), hash: ''}
        nodes.push(node)
        if (i !== 0) {
            const hash = crypt.createHash('sha256')
            hash.update(JSON.stringify(nodes[i - 1]))
            nodes[i].hash = hash.digest('hex')
        }
    }
    return nodes
}

export class HashedList {
    private _list: IHashedNode[]
    private _index: number = 0
    constructor(items: any[]) {
        this._list = hashedListFromArray(items)
    }
    public add(item: any): IHashedNode {
        const hash = crypt.createHash('sha256')
        hash.update(JSON.stringify(this._list[this._list.length - 1]))
        this._list.push({
            data: item,
            hash: hash.digest('hex'),
            index: this._list.length,
            timestamp: new Date().valueOf(),
        })
        return this._list[this._list.length - 1]
    }

    public validate(): boolean {
        if (this._list[0].hash !== '') { return false }
        for (let i = 1; i < this._list.length; i++) {
            const hash = crypt.createHash('sha256')
            hash.update(JSON.stringify(this._list[i - 1]))
            if (hash.digest('hex') !== this._list[i].hash) { return false }
        }
        return true
    }

    public next(): IHashedNode | undefined {
        return this._list[++this._index]
    }

    public pop(): IHashedNode | undefined {
        return this._list.pop()
    }

    public rewind(): void { this._index = 0 }
    public data(): IHashedNode { return this._list[this._index].data }
    public list(): IHashedNode[] { return this._list }
    public hash(): string {
        let s: string = ''
        for (let i = 1; i < this._list.length; i++) { s += this._list[i].hash }
        const hash = crypt.createHash('sha256')
        hash.update(s)
        return hash.digest('hex')
    }
}
