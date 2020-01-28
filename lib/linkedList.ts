export class LinkedList {
    private _list: INode[]
    private _index: number = 0
    constructor(items: any[]) {
        this._list = linkedListFromArray(items)
    }
    get next(): INode { return this._list[this._index].next }
    get data(): INode { return this._list[this._index].data }
}

const linkedListFromArray = (items: any[]) => {
    const nodes: INode[] = []
    let headRef: any = null
    for (let i = items.length - 1; i > -1; i--) {
        const node = {next: headRef, data: items[i]}
        nodes.push(node)
        headRef = node
    }
    return nodes.reverse()
}
