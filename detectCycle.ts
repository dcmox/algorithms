import { LinkedList } from './lib/linkedList'

export const detectCycle = (nodes: INode[] | LinkedList) => {
    let slow: INode
    let fast: INode
    if (nodes instanceof LinkedList) {
        slow = nodes
        fast = nodes
    } else {
        slow = nodes[0]
        fast = nodes[0]
    }

    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
        if (fast === slow) { return true }
    }
    return false
}
